import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { DashboardUser } from './pages/dashboard-user/dashboard-user';
import { Workers } from './pages/dashbord-admin/workers/workers';
import { DashboardAdmin } from './pages/dashbord-admin/dashboard-admin';
import { CreateWorkers } from './pages/dashbord-admin/create-workers/create-workers';
import { authGuard } from './core/guards/auth-guard';
import { Constructions } from './pages/dashbord-admin/constructions/constructions';
import { EditWorker } from './pages/dashbord-admin/edit-worker/edit-worker';
import { DeleteWorker } from './pages/dashbord-admin/delete-worker/delete-worker';
import { Assignments } from './pages/dashbord-admin/assignments/assignments';
import { adminGuard } from './core/guards/admin-guard';
import { userGuard } from './core/guards/user-guard';
import { Log } from './components/user/log/log';


export const routes: Routes = [

    { path: 'register', component: Register },
    { path: '', component: Login },
    { path: 'dashboard_admin', component: DashboardAdmin, canActivate: [authGuard] },
    { path: 'dashboard_user', component: DashboardUser },
    { path: 'dashboard_user/logs', component: Log },
    { path: 'dashboard_admin/workers', component: Workers, canActivate: [adminGuard] },
    { path: 'dashboard_admin/constructions', component: Constructions }, //canActivate: [adminGuard] },
    { path: 'dashboard_admin/create-worker', component: CreateWorkers, canActivate: [adminGuard] },
    { path: 'dashboard_admin/edit-worker/:id_users', component: EditWorker },
    { path: 'dashboard_admin/delete-worker/:id_users', component: DeleteWorker },
    { path: 'dashboard_admin/assignments', component: Assignments }, //canActivate: [userGuard] },
    { path: '**', redirectTo: 'dashboard_admin' } // Redirige al dashboard para cualquier ruta no definida, debe redirigir a dashboard user si es user, o al login si no está autenticado




];
