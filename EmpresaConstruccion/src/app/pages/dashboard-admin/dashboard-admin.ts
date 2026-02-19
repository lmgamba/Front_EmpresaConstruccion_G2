import { Component, inject, OnInit, signal, computed, ChangeDetectorRef } from '@angular/core';
import { WorkersList } from '../../components/admin/workers-list/workers-list';
import { IUser } from '../../interfaces/iuser';
import { IConstruction } from '../../interfaces/iconstruction';
import { IAssignments } from '../../interfaces/iassignments';
import { AuthService } from '../../core/services/auth-service';
import { UserService } from '../../core/services/users-service';
import { ConstructionService } from '../../core/services/constructions-service';
import { AssignmentsService } from '../../core/services/assignments-service';
import { LogService } from '../../core/services/logs-service';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [WorkersList, RouterLink, CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private constructionService = inject(ConstructionService);
  private assignmentsService = inject(AssignmentsService);
  private logService = inject(LogService);
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);

  allWorkers = signal<IUser[]>([]);
  allConstructions = signal<IConstruction[]>([]);
  allAssignments = signal<IAssignments[]>([]);
  allLogs = signal<any[]>([]); 
  currentUser = signal<IUser | null>(null);

  // 1. Proyectos con estadísticas
  projectsWithStats = computed(() => {
    const constructions = this.allConstructions();
    const assignments = this.allAssignments();
    return constructions.map(project => {
      const assigned = assignments.filter(a => 
        Number(a.constructionsSites_id) === Number(project.id_constructions) && Number(a.status) === 1
      );
      return {
        ...project,
        workerCount: assigned.length,
        completion: Math.min(assigned.length * 20, 100)
      };
    });
  });

  // 2. Métricas
  metrics = computed(() => [
    { title: 'Active Projects', value: this.allConstructions().length.toString(), subtext: 'Global sites' },
    { title: 'On-site Workers', value: this.allAssignments().filter(a => Number(a.status) === 1).length.toString(), subtext: 'Current total' },
    { title: 'Active Alerts', value: this.allLogs().filter(log => log.type === 'ALERT').length.toString(), subtext: 'Urgent reports' },
    { title: 'Available Staff', value: this.allWorkers().filter(w => w.status).length.toString(), subtext: 'Ready' }
  ]);

  // 3. Feed (Los 3 más recientes de TODAS sus obras asignadas)
  feed = computed(() => {
    return this.allLogs()
      .slice(0, 3)
      .map(log => ({
        id: log.id_logs,
        type: log.type,
        message: log.description
      }));
  });

  // 4. Mapa (Usa la primera obra de sus asignaciones o la global)
  adminMapUrl = computed<SafeResourceUrl | null>(() => {
    const constructions = this.allConstructions();
    const logs = this.allLogs();
    
    let targetSite: IConstruction | undefined;

    // Si hay logs, intentamos mostrar el mapa de la obra del último log
    if (logs.length > 0) {
      targetSite = constructions.find(c => Number(c.id_constructions) === Number(logs[0].constructionsSites_id));
    } 
    
    // Si no hay logs o no encontramos la obra, usamos la primera global
    if (!targetSite) targetSite = constructions[0];

    if (targetSite && targetSite.latitude && targetSite.longitude) {
      const rawUrl = `https://maps.google.com/maps?q=${targetSite.latitude},${targetSite.longitude}&z=15&output=embed`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    }
    return null;
  });

  async ngOnInit() {
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    try {
      // A. Carga inicial de datos maestros
      const [workers, constructions, assignments] = await Promise.all([
        this.userService.getAll(),
        this.constructionService.getAll(),
        this.assignmentsService.getAll()
      ]);

      this.allWorkers.set(workers);
      this.allConstructions.set(constructions);
      this.allAssignments.set(assignments);

      // B. Cargar usuario actual
      const user = await this.userService.getById(userId.toString());
      this.currentUser.set(user);

      // C. LÓGICA DE LOGS (Copiada de tu LogsAdmin exitosa)
      // 1. Obtener IDs de obras donde el Admin está asignado
      const myAssignments = assignments.filter(a => Number(a.users_id) === Number(userId));
      const siteIds = [...new Set(myAssignments.map(a => a.constructionsSites_id))];

      if (siteIds.length > 0) {
  const logsRequests = await Promise.all(
    siteIds.map(id => this.logService.getByConstruction(Number(id)))
  );
  
  // Unificar y filtrar
  const flatLogs = logsRequests.flat();

  // Ordenar con validación de tipo para evitar el error "Argument of type Date | undefined..."
  const sortedLogs = flatLogs.sort((a, b) => {
    const dateA = a.date_register ? new Date(a.date_register).getTime() : 0;
    const dateB = b.date_register ? new Date(b.date_register).getTime() : 0;
    return dateB - dateA;
  });

  this.allLogs.set(sortedLogs);
}

      this.cdr.detectChanges();
    }
    catch (error) {
      console.error('Error loading Dashboard Admin data:', error);
    }
  }
}