import { Component, inject, Input, EventEmitter, Output, signal, effect, input } from '@angular/core';
import { UsersCard } from '../../../../components/admin/user_card/user_card';
import { IUser } from '../../../../interfaces/iuser';
import { IConstruction } from '../../../../interfaces/iconstruction';
import { IAssignments } from '../../../../interfaces/iassignments'; // Importa la interfaz
import { RouterLink } from "@angular/router";
import { AssignmentsService } from '../../../../core/services/assignments-service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'site-card',
  standalone: true,
  imports: [UsersCard, RouterLink],
  templateUrl: './site-card.html',
  styleUrl: './site-card.css',
})
export class SiteCard {
  private assignmentsService = inject(AssignmentsService);

  @Input() UsersbyConstruction: IUser[] = [];
  @Input() allAssignments: IAssignments[] = []; // <--- Necesitamos esto del padre
  @Input() construction: IConstruction = {
    id_constructions: 0,
    name: "",
    description: "",
    address: "",
    latitude: 0,
    longitude: 0
  };
  @Input() showDetailsInput: boolean = false;
   @Input() editOptions: boolean = false; // Controla si se muestran las opciones de editar/eliminar


  @Output() dataChanged = new EventEmitter<void>();

  // Mantenemos un signal interno para permitir el toggle local
  // Lo inicializamos con el valor del input
  showDetails = signal<boolean>(false);

  constructor() {
    // Sincronizamos el signal interno cuando el input cambie
    effect(() => {
      this.showDetails.set(this.showDetailsInput);
    }, { allowSignalWrites: true });
  }



  private sanitizer = inject(DomSanitizer);
  
  // Creamos un getter que genera la URL del mapa
get mapUrl(): SafeResourceUrl {
  // Forzamos que si no hay coordenadas, use unas por defecto (0,0) para que no rompa
  const lat = this.construction.latitude ?? 0;
  const lng = this.construction.longitude ?? 0;
  
  // URL corregida para el embed de Google Maps
  const url = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  toggleDetails(event: Event) {
    event.preventDefault(); // Evita que el enlace recargue la página
    this.showDetails.update(value => !value);
  }

async removeWorker(worker_id: number) {
  // Convertimos worker_id y el ID de la construcción a Number para evitar el error de tipos
  const assignment = this.allAssignments.find(a => 
    Number(a.users_id) === Number(worker_id) && 
    Number(a.constructionsSites_id) === Number(this.construction.id_constructions) &&
    a.status === 1
  );

  if (!assignment) {
    Swal.fire('Error', 'No active assignment found.', 'error');
    return;
  }

    // 2. Confirmación
    const result = await Swal.fire({
      title: 'Finish Assignment?',
      text: `Are you sure you want to remove this worker from ${this.construction.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Yes, finish it',
      background: '#1e293b',
      color: '#ffffff'
    });

    if (result.isConfirmed) {
      try {
        // 3. Llamamos a tu servicio con el id_assignments encontrado
        await this.assignmentsService.finish(assignment.id_assignments);
        
        await Swal.fire({
          title: 'Success',
          text: 'Assignment finished correctly.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#1e293b',
          color: '#ffffff'
        });

        // 4. Notificamos al padre para que refresque los signals
        this.dataChanged.emit();

      } catch (error) {
        console.error('Error finishing assignment:', error);
        Swal.fire('Error', 'The server could not finish the assignment.', 'error');
      }
    }
  }
}