import { Component, signal, inject, OnInit, ChangeDetectorRef, computed } from '@angular/core';
import { WorkersList } from '../../../components/admin/workers-list/workers-list';
import { IUser } from '../../../interfaces/iuser';
import { UserService } from '../../../core/services/users-service';
import { SiteCard } from "../constructions/site-card/site-card";
import { IConstruction } from '../../../interfaces/iconstruction';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth-service';
import { AssignmentsService } from '../../../core/services/assignments-service';
import { ConstructionService } from '../../../core/services/constructions-service';

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [WorkersList, SiteCard, RouterLink],
  templateUrl: './workers.html',
  styleUrl: './workers.css',
})
export class Workers implements OnInit {
  private authService = inject(AuthService);
  private assignmentsService = inject(AssignmentsService);
  private userService = inject(UserService);
  private constructionService = inject(ConstructionService);
  //private cdr = inject(ChangeDetectorRef);

  // --- SIGNALS DE ESTADO ---
  allWorkers = signal<IUser[]>([]);
  arrayConstructions = signal<IConstruction[]>([]);
  allAssignments = signal<any[]>([]);
  
  // Filtro seleccionado (Available / Busy / All)
  filterStatus = signal<'Available' | 'Busy' | 'All'>('All');
  searchQuery = signal<string>('');

  currentAdminId!: number;

  // --- SIGNALS COMPUTADOS (Lógica automática) ---
  // Filtra los trabajadores según el botón pulsado y la búsqueda
  filteredWorkers = computed(() => {
    let workers = this.allWorkers();
    const statusFilter = this.filterStatus();
    const search = this.searchQuery().toLowerCase();

    if (statusFilter === 'Available') {
      workers = workers.filter(w => w.status);
    } else if (statusFilter === 'Busy') {
      workers = workers.filter(w => !w.status);
    }

    if (search) {
      workers = workers.filter(w => 
        w.name.toLowerCase().includes(search) || 
        w.surname?.toLowerCase().includes(search)
      );
    }
    return workers;
  });

  // Totales para los badges
  totalAvailable = computed(() => this.allWorkers().filter(w => w.status).length);
  totalBusy = computed(() => this.allWorkers().filter(w => !w.status).length);

  ngOnInit() {
    const id = this.authService.getCurrentUserId();
    if (id) {
      this.currentAdminId = id;
      this.loadAdminData();
    }
  }

  async loadAdminData() {
    try {
      // 1. Obtener los IDs de las obras a cargo del Admin
      const myAssignments = await this.assignmentsService.getAssignmentsByUserId(this.currentAdminId);
      const siteIds = myAssignments.map((a: any) => a.constructionsSites_id);

      // 2. Traer Obras, Todos los Usuarios y Todas las Asignaciones
      const [constructions, users, assignments] = await Promise.all([
        this.constructionService.getAll(),
        this.userService.getAll(),
        this.assignmentsService.getAll() // O una ruta que traiga asignaciones activas
      ]);

      // 3. Filtrar solo las obras que gestiona este Admin
      const adminSites = constructions.filter((c: any) => siteIds.includes(c.id_constructions));
      
      this.arrayConstructions.set(adminSites);
      this.allWorkers.set(users);
      this.allAssignments.set(assignments);

      // 4. Forzar detección de cambios (Refuerzo Zone.js)
      //this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  }

  // Métodos para el HTML
  setFilter(status: 'Available' | 'Busy' | 'All') {
    this.filterStatus.set(status);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  // Función para obtener usuarios de una obra específica (usada en el HTML)
  getUsersByConstruction(siteId: number): IUser[] {
    const workerIds = this.allAssignments()
      .filter(a => a.constructionsSites_id === siteId && a.status)
      .map(a => a.users_id);
    
    return this.allWorkers().filter(u => workerIds.includes(u.id_users));
  }
}