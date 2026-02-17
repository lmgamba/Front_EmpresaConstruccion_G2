import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LogService } from '../../../core/services/logs-service';
import { AuthService } from '../../../core/services/auth-service';
import { AssignmentsService } from '../../../core/services/assignments-service';
import { LogCard } from '../log-card/log-card';
import Swal from 'sweetalert2';
import { ILogs } from '../../../interfaces/ilogs';

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
  private constructionSitesService = inject(AssignmentsService); 
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

  


  // PARA PRUEBA
  public arrayLogsTest: ILogs[] = [
  {
    id_logs: 1,
    description: 'Se ha detectado una fisura estructural en el pilar B-12 tras el desencofrado. Se requiere revisión del ingeniero de guardia.',
    type: 'Alert',
    date_register: new Date('2024-05-20T10:30:00'),
    users_id: 10,
    constructionsSites_id: 101
  },
  {
    id_logs: 2,
    description: 'Vaciado de hormigón completado en la losa del tercer nivel. Todo el proceso se realizó según el cronograma previsto.',
    type: 'Avance',
    date_register: new Date('2024-05-21T14:15:00'),
    users_id: 12,
    constructionsSites_id: 102
  },
  {
    id_logs: 3,
    description: 'Falta de suministro eléctrico en la zona norte de la obra. El equipo de mantenimiento está revisando el generador principal.',
    type: 'Alert',
    date_register: new Date('2024-05-21T16:45:00'),
    users_id: 8,
    constructionsSites_id: 101
  },
  {
    id_logs: 4,
    description: 'Finalización de la instalación de tuberías de desagüe en el sótano. Iniciando pruebas de presión mañana a primera hora.',
    type: 'Avance',
    date_register: new Date('2024-05-22T09:00:00'),
    users_id: 15,
    constructionsSites_id: 105
  },
  {
    id_logs: 5,
    description: 'Reporte semanal: Se han recibido todos los materiales de carpintería metálica. Almacenados correctamente en bodega.',
    type: 'Report',
    date_register: new Date('2024-05-22T11:20:00'),
    users_id: 10,
    constructionsSites_id: 103
  },
  {
    id_logs: 6,
    description: 'Retraso en la entrega de materiales por huelga de transporte externa. Se reprograman las tareas de albañilería para el lunes.',
    type: 'Alert',
    date_register: new Date('2024-05-23T08:10:00'),
    users_id: 12,
    constructionsSites_id: 102
  }
];

}