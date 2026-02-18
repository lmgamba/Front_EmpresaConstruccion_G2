import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LogService } from '../../../core/services/logs-service';
import { AuthService } from '../../../core/services/auth-service';
import { AssignmentsService } from '../../../core/services/assignments-service';
import { ConstructionService } from '../../../core/services/constructions-service';
import { LogCard } from '../log-card/log-card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LogCard],
  templateUrl: './log.html',
  styleUrl: './log.css'
})
export class Log implements OnInit {
  private logService = inject(LogService);
  private authService = inject(AuthService);
  private assigmentsService = inject(AssignmentsService);
  private constructionService = inject(ConstructionService);
  private cdr = inject(ChangeDetectorRef); // Inyectamos el detector de cambios

  // Declaramos los Signals
  arrayLogs = signal<any[]>([]);
  myAssignments = signal<any[]>([]); 
  currentUserId!: number;

  logForm = new FormGroup({
    constructionsSites_id: new FormControl('', [Validators.required]),
    type: new FormControl('Report', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.currentUserId = userId;
      this.loadData();
    } else {
      console.error("No se encontró el ID del usuario");
    }
  }

  async loadData() {
    try {
      const [assignments, logs, allConstructions] = await Promise.all([
        this.assigmentsService.getAssignmentsByUserId(this.currentUserId),
        this.logService.getByUser(this.currentUserId),
        this.constructionService.getAll()
      ]);

      // Mapeamos los datos
      const mappedAssignments = assignments.map((asig: any) => {
        const construction = allConstructions.find(
          (c: any) => c.id_constructions === asig.constructionsSites_id
        );
        return {
          ...asig,
          constructionName: construction ? construction.name : `Site ID: ${asig.constructionsSites_id}`
        };
      });

      // Actualizamos los Signals usando .set()
      this.myAssignments.set(mappedAssignments);
      this.arrayLogs.set(logs);

      // Forzamos la detección de cambios para salir de la "zona muerta"
      this.cdr.detectChanges();

    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  }

  async onSubmit() {
    if (this.logForm.invalid) return;

    try {
      await this.logService.create(this.logForm.value as any);
      Swal.fire('¡Creado!', 'Log registrado.', 'success');
      
      this.logForm.reset({ type: 'Report' });

      // Refrescamos los logs y actualizamos el signal
      const updatedLogs = await this.logService.getByUser(this.currentUserId);
      this.arrayLogs.set(updatedLogs);
      
      this.cdr.detectChanges(); // Refuerzo tras el submit
    } catch (error: any) {
      Swal.fire('Error', 'No se pudo crear el log', 'error');
    }
  }
}