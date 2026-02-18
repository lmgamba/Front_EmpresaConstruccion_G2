import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { LogService } from '../../../core/services/logs-service';
import { AuthService } from '../../../core/services/auth-service';
import { AssignmentsService } from '../../../core/services/assignments-service';
import { UserService } from '../../../core/services/users-service';
import { LogCard } from '../../../components/user/log-card/log-card';

@Component({
  selector: 'app-logs-admin',
  standalone: true,
  imports: [LogCard],
  templateUrl: './logs-admin.html',
  styleUrl: './logs-admin.css',
})
export class LogsAdmin implements OnInit {
  private logService = inject(LogService);
  private authService = inject(AuthService);
  private assigmentsService = inject(AssignmentsService);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef); // Refuerzo para forzar el pintado

  // Usamos signals para que el DOM reaccione al cambio de valor
  filteredLogs = signal<any[]>([]);
  allLogs: any[] = []; 
  currentAdminId!: number;

  ngOnInit() {
    const id = this.authService.getCurrentUserId();
    if (id) {
      this.currentAdminId = id;
      this.loadAdminData();
    }
  }

  async loadAdminData() {
    try {
      // 1. Obtener obras asignadas
      const myAssignments = await this.assigmentsService.getAssignmentsByUserId(this.currentAdminId);
      const siteIds = myAssignments.map((a: any) => a.constructionsSites_id);

        this.cdr.detectChanges();

      // 2. Traer logs y usuarios en paralelo
      const [logsRequests, users] = await Promise.all([
        Promise.all(siteIds.map(id => this.logService.getByConstruction(id))),
        this.userService.getAll() 
      ]);

      // 3. Unificar y cruzar datos
      const flatLogs = logsRequests.flat();
      this.allLogs = flatLogs.map(log => {
        const user = users.find((u: any) => u.id_users === log.users_id);
        return {
          ...log,
          userName: user?.name || 'Unknown',
          userSurname: user?.surname || 'Unknown'
        };
      });

      // 4. Actualizar el Signal
      this.filteredLogs.set([...this.allLogs]);
      
      // 5. Ordenar por defecto (esto también actualiza el signal)
      this.sortBy('date_register');

      // 6. Refuerzo final de detección de cambios
      this.cdr.detectChanges();

    } catch (error) {
      console.error('Error loading admin logs:', error);
      // En caso de error, mostramos al menos los de prueba
      this.filteredLogs.set([...this.arrayLogsTest]);
      this.cdr.detectChanges();
    }
  }

  sortBy(criteria: string) {
    // IMPORTANTE: Obtenemos los datos, ordenamos una copia
    const currentData = [...this.allLogs]; 

    currentData.sort((a, b) => {
      if (criteria === 'date_register') {
        return new Date(b.date_register).getTime() - new Date(a.date_register).getTime();
      }
      if (criteria === 'constructionsSites_id') {
        return a.constructionsSites_id - b.constructionsSites_id;
      }
      if (criteria === 'userSurname') {
        return (a.userSurname || '').localeCompare(b.userSurname || '');
      }
      return 0;
    });

    // Actualizamos el Signal (esto debería bastar para el DOM)
    this.filteredLogs.set(currentData);
    
    // Forzamos manualmente por si Zone.js sigue bloqueado
    this.cdr.detectChanges();
    
    console.log('Ordenado por:', criteria); 
  }

  // Tu array de prueba...
  public arrayLogsTest: any[] = [ /* ... tus datos de prueba ... */ ];
}