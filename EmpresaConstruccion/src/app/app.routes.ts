import { Router, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { DashboardUser } from './pages/dashboard-user/dashboard-user';
import { Workers } from './pages/dashboard-admin/workers/workers';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { CreateWorkers } from './pages/dashboard-admin/create-workers/create-workers';
import { authGuard } from './core/guards/auth-guard';
import { Constructions } from './pages/dashboard-admin/constructions/constructions';
import { EditWorker } from './pages/dashboard-admin/edit-worker/edit-worker';
import { DeleteWorker } from './pages/dashboard-admin/delete-worker/delete-worker';
import { Assignments } from './pages/dashboard-admin/assignments/assignments';
import { adminGuard } from './core/guards/admin-guard';
import { userGuard } from './core/guards/user-guard';
import { SettingAdmin } from './pages/dashboard-admin/setting/setting';
import { SettingUser } from './pages/dashboard-user/setting/setting';
import { Log } from './components/user/log/log';
import { AssignmentUser } from './pages/dashboard-user/assignment-user/assignment-user';
import { LogsAdmin } from './pages/dashboard-admin/logs-admin/logs-admin';
import { AuthService } from './core/services/auth-service';
import { inject } from '@angular/core';
import { Editconstruction } from './pages/dashboard-admin/constructions/edit-construction/edit-construction';
import { Deleteconstruction } from './pages/dashboard-admin/constructions/delete-construction/delete-construction';


// Esta función decide el destino sin cargar componentes intermedios
const dashboardRedirect = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getRole(); // Asegúrate de que esto devuelva 'admin' o 'operario'

  if (role === 'admin') return 'dashboard_admin';
  if (role === 'user') return 'dashboard_user';
  
  return ''; // Si no hay rol, vuelve al login
};

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  // RUTA DINÁMICA: No tiene componente, solo redirige
  { 
    path: 'dashboard', 
    redirectTo: dashboardRedirect, 
    pathMatch: 'full' 
  },

  { path: 'dashboard_admin', component: DashboardAdmin, canActivate: [authGuard] },
  { path: 'dashboard_user', component: DashboardUser, canActivate: [authGuard] },
  { path: 'dashboard_user/logs', component: Log },
  { path: 'dashboard-user/assignments', component: AssignmentUser, canActivate: [userGuard] },
  { path: 'dashboard-user/settings', component: SettingUser },
  { path: 'dashboard_admin/workers', component: Workers, canActivate: [adminGuard] },
  { path: 'dashboard_admin/constructions', component: Constructions, canActivate: [adminGuard] },
  { path: 'dashboard_admin/edit-construction/:id_constructions', component: Editconstruction },
  { path: 'dashboard_admin/delete-construction/:id_constructions', component: Deleteconstruction },
  { path: 'dashboard_admin/logs', component: LogsAdmin, canActivate: [adminGuard]  },
  { path: 'dashboard_admin/create-worker', component: CreateWorkers, canActivate: [adminGuard] },
  { path: 'dashboard_admin/edit-worker/:id_users', component: EditWorker },
  { path: 'dashboard_admin/delete-worker/:id_users', component: DeleteWorker },
  { path: 'dashboard_admin/assignments', component: Assignments, canActivate: [adminGuard] },
  { path: 'dashboard_admin/settings', component: SettingAdmin },
  { path: '**', redirectTo: 'dashboard' }, // Redirige al dashboard para cualquier ruta no definida, debe redirigir a dashboard user si es user, o al login si no está autenticado
];
