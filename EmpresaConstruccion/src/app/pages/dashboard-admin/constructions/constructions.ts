import { Component, inject, OnInit, signal, ChangeDetectorRef, computed } from '@angular/core';
import { SiteCard } from './site-card/site-card';
import { IConstruction } from '../../../interfaces/iconstruction';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../interfaces/iuser';
import { ConstructionService } from '../../../core/services/constructions-service';
import { AssignmentsService } from '../../../core/services/assignments-service';
import { UserService } from '../../../core/services/users-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-constructions',
  standalone: true,
  imports: [SiteCard, ReactiveFormsModule],
  templateUrl: './constructions.html',
  styleUrl: './constructions.css',
})
export class Constructions implements OnInit {
private constructionService = inject(ConstructionService);
  private assignmentsService = inject(AssignmentsService);
  private usersService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  // --- SIGNALS DE ESTADO ---
  arrayConstructions = signal<IConstruction[]>([]);
  allWorkers = signal<IUser[]>([]);
  allAssignments = signal<any[]>([]);

  // --- COMPUTED PARA EL TOTAL ---
  totalConstructions = computed(() => this.arrayConstructions().length);

  registerFrom: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    latitude: new FormControl(null, [Validators.required]),
    longitude: new FormControl(null, [Validators.required]),
    status: new FormControl('active')
  });

  async ngOnInit() {
    await this.loadAllData();
  }

  async loadAllData() {
    try {
      // Cargamos todo en paralelo para ir más rápido
      const [constructions, workers, assignments] = await Promise.all([
        this.constructionService.getAll(),
        this.usersService.getAll(),
        this.assignmentsService.getAll()
      ]);

      this.arrayConstructions.set(constructions);
      this.allWorkers.set(workers);
      this.allAssignments.set(assignments);
      
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  }

  // Función para obtener usuarios de una obra específica
  getUsersByConstruction(siteId: number | undefined): IUser[] {
    if (!siteId) return [];
    
    // Filtramos las asignaciones activas (status 1) para esta obra
    const assignedIds = this.allAssignments()
      .filter(a => Number(a.constructionsSites_id) === Number(siteId) && a.status === 1)
      .map(a => a.users_id);

    // Retornamos los objetos de usuario correspondientes
    return this.allWorkers().filter(u => assignedIds.includes(u.id_users));
  }

  async onSubmit() {
    if (this.registerFrom.invalid) {
      Swal.fire('Atención', 'Por favor completa todos los campos obligatorios', 'info');
      return;
    }

    try {
      await this.constructionService.create(this.registerFrom.value);
      
      await Swal.fire({
        title: 'Construction registered!',
        text: 'Construction registered successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      this.registerFrom.reset({ status: 'active' });
      
      // Refrescamos la lista y el signal se encargará de actualizar el DOM
      await this.loadAllData();

    } catch (error) {
      Swal.fire({
        title: 'Mistake!',
        text: 'There was a problem creating the project',
        icon: 'error',
      });
    }
  }
}