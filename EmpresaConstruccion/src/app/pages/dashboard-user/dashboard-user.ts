import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth-service';
import { UserService } from '../../core/services/users-service';
import { AssignmentsService } from '../../core/services/assignments-service';
import { LogService } from '../../core/services/logs-service';
import { ConstructionService } from '../../core/services/constructions-service';
import { LogCard } from '../../components/user/log-card/log-card';
import { CardAssignment } from '../dashboard-user/assignment-user/card-assignment/card-assignment';
import { IUser } from '../../interfaces/iuser';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, LogCard, CardAssignment],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css'
})
export class DashboardUser implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private assignmentsService = inject(AssignmentsService);
  private logService = inject(LogService);
  private constructionService = inject(ConstructionService);
  private sanitizer = inject(DomSanitizer);

  // Signals
  currentUser = signal<IUser | null>(null);
  myAssignments = signal<any[]>([]);
  myLogs = signal<any[]>([]);
  allConstructions = signal<any[]>([]);

  // Agregamos un computed para obtener la URL del mapa de la asignación actual
  currentMapUrl = computed<SafeResourceUrl | null>(() => {
    const assignments = this.myAssignments();
    const constructions = this.allConstructions();

    if (assignments.length > 0) {
      // Buscamos la data de la construcción vinculada a la primera asignación
      const activeSite = constructions.find(
        c => c.id_constructions === assignments[0].constructionsSites_id
      );

      if (activeSite && activeSite.latitude && activeSite.longitude) {
        // Usamos la misma lógica de URL que en site-cards
        const rawUrl = `https://maps.google.com/maps?q=${activeSite.latitude},${activeSite.longitude}&z=15&output=embed`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
      }
    }
    return null;
  });


  // Métricas dinámicas para el operario
  metrics = computed(() => {
    const assignments = this.myAssignments();
    const logs = this.myLogs();
    
    // Cálculo de días en la asignación actual (simplificado)
    let activeDays = 0;
    if (assignments.length > 0) {
      const start = new Date(assignments[0].date_start);
      const end = new Date();
      activeDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    }

    return [
      { title: 'Active Assignments', value: assignments.length.toString(), subtext: 'Currently deployed' },
      { title: 'Total Reports', value: logs.length.toString(), subtext: 'Logs submitted' },
      { title: 'Days on Current Site', value: activeDays > 0 ? activeDays.toString() : '0', subtext: 'Since start date' },
      { title: 'Pending Alerts', value: logs.filter(l => l.type === 'ALERT').length.toString(), subtext: 'Urgent reports' }
    ];
  });

  // Últimos 3 logs para la barra lateral
  recentLogs = computed(() => this.myLogs().slice(0, 3));

  async ngOnInit() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      await this.loadDashboardData(userId);
    }
  }

  async loadDashboardData(userId: number) {
    try {
      const [user, assignments, logs, constructions] = await Promise.all([
        this.userService.getById(userId.toString()),
        this.assignmentsService.getAssignmentsByUserId(userId),
        this.logService.getByUser(userId),
        this.constructionService.getAll()
      ]);

      this.currentUser.set(user);
      this.myLogs.set(logs);
      this.allConstructions.set(constructions);
      
      // Enriquecer asignaciones con nombres de obras
      const mapped = assignments.map((asig: any) => ({
        ...asig,
        constructionName: constructions.find(c => c.id_constructions === asig.constructionsSites_id)?.name || 'Unknown Site'
      }));
      this.myAssignments.set(mapped);

    } catch (error) {
      console.error('Error loading User Dashboard:', error);
    }
  }
}