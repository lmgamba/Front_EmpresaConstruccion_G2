import { Component, inject, OnInit, signal, computed, ChangeDetectorRef } from '@angular/core';
import { WorkersList } from '../../components/admin/workers-list/workers-list';
import { IUser } from '../../interfaces/iuser';
import { IConstruction } from '../../interfaces/iconstruction';
import { IAssignments } from '../../interfaces/iassignments';
import { AuthService } from '../../core/services/auth-service';
import { UserService } from '../../core/services/users-service';
import { ConstructionService } from '../../core/services/constructions-service';
import { AssignmentsService } from '../../core/services/assignments-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [WorkersList, RouterLink],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css',
})
export class DashboardUser {
  // --- INYECCIONES ---
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private constructionService = inject(ConstructionService);
  private assignmentsService = inject(AssignmentsService);
  private cdr = inject(ChangeDetectorRef);

  // --- SIGNALS DE ESTADO (DATOS BRUTOS) ---
  allWorkers = signal<IUser[]>([]);
  allConstructions = signal<IConstruction[]>([]);
  allAssignments = signal<IAssignments[]>([]);
  currentUser = signal<IUser | null>(null);

  // --- SIGNALS COMPUTADOS (EVITAN EL TIMEOUT) ---
  
  // 1. Proyectos con estadísticas pre-calculadas para la tabla
  projectsWithStats = computed(() => {
    const constructions = this.allConstructions();
    const assignments = this.allAssignments();

    return constructions.map(project => {
      // Filtrar asignaciones activas para este proyecto específico
      const assigned = assignments.filter(a => 
        Number(a.constructionsSites_id) === Number(project.id_constructions) && 
        Number(a.status) === 1
      );

      return {
        ...project,
        workerCount: assigned.length,
        // Lógica de progreso ejemplo: 20% por trabajador, máximo 100%
        completion: Math.min(assigned.length * 20, 100)
      };
    });
  });

  // 2. Métricas de la parte superior
  metrics = computed(() => [
    {
      title: 'Active Projects',
      value: this.allConstructions().length.toString(),
      subtext: 'Across all locations'
    },
    {
      title: 'On-site Workers',
      value: this.allAssignments().filter(a => Number(a.status) === 1).length.toString(),
      subtext: 'Currently assigned'
    },
    {
      title: 'Available Staff',
      value: this.allWorkers().filter(w => w.status).length.toString(),
      subtext: 'Ready for deployment'
    }
    // ,
    // {
    //   title: 'Global Progress',
    //   value: '72%', 
    //   subtext: 'Average completion'
    // }
  ]);

  // 3. Site Feed basado en las últimas 4 asignaciones
  feed = computed(() => {
    return this.allAssignments()
      .slice(-4)
      .map(a => ({
        id: a.id_assignments,
        time: 'Recent',
        message: `Worker ID ${a.users_id} assigned to project ${a.constructionsSites_id}`
      }));
  });

  // --- CICLO DE VIDA ---
  async ngOnInit() {
    await this.loadDashboardData();
  }

  // --- CARGA DE DATOS ---
async loadDashboardData() {
  const userId = this.authService.getCurrentUserId();
  
  try {
    // 1. Cargamos las listas generales (esto no debería fallar)
    const [workers, constructions, assignments] = await Promise.all([
      this.userService.getAll(),
      this.constructionService.getAll(),
      this.assignmentsService.getAll()
    ]);

    this.allWorkers.set(workers);
    this.allConstructions.set(constructions);
    this.allAssignments.set(assignments);

    // 2. Intentamos cargar el usuario actual por separado
    if (userId) {
      try {
        const user = await this.userService.getById(userId.toString());
        this.currentUser.set(user);
      } catch (userError) {
        console.warn('Could not load current user profile', userError);
        // Seteamos un usuario genérico o nulo para que no rompa el avatar
      }
    }

    this.cdr.detectChanges();
  } catch (error) {
    console.error('Critical error loading dashboard lists', error);
  }
}
}