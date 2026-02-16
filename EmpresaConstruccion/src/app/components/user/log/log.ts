import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LogService } from '../../../core/services/logs-service';
import { AuthService } from '../../../core/services/auth-service';
import { AssignmentsService } from '../../../core/services/assignments-service';
import { LogCard } from '../log-card/log-card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LogCard],
  templateUrl: './log.html',
  styleUrl: './log.css'
})
export class Log {
  private logService = inject(LogService);
  private authService = inject(AuthService);
  private assigmentsService = inject(AssignmentsService);

  arrayLogs: any[] = [];
  myAssignments: any[] = []; 
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
      // Cargamos ambas cosas en paralelo para ganar velocidad
      const [assignments, logs] = await Promise.all([
        this.assigmentsService.getAssignmentsByUserId(this.currentUserId),
        this.logService.getByUser(this.currentUserId)
      ]);
      
      this.myAssignments = assignments;
      this.arrayLogs = logs;
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
      // Refrescamos solo los logs
      this.arrayLogs = await this.logService.getByUser(this.currentUserId);
    } catch (error: any) {
      Swal.fire('Error', 'No se pudo crear el log', 'error');
    }
  }
}