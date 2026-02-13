import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { DashboardUser } from './pages/dashboard-user/dashboard-user';
import { Workers } from './pages/dashbord-admin/workers/workers';
import { DashboardAdmin } from './pages/dashbord-admin/dashboard-admin';
import { CreateWorkers } from './pages/dashbord-admin/create-workers/create-workers';
import { authGuard } from './core/guards/auth-guards';
import { SiteCard } from './components/admin/constructions/site-card/site-card';
import { Constructions } from './components/admin/constructions/constructions';
import { EditWorker } from './pages/dashbord-admin/edit-worker/edit-worker';
import { DeleteWorker } from './pages/dashbord-admin/delete-worker/delete-worker';
import { Assigments } from './pages/assigments/assigments';


export const routes: Routes = [
    // TODO: guards, 
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'dashboard_admin', component: DashboardAdmin },
    { path: 'dashboard_user', component: DashboardUser },
    { path: 'dashboard_admin/workers', component: Workers },
    { path: 'dashboard_admin/constructions', component: Constructions },
    { path: 'dashboard_admin/create-worker', component: CreateWorkers, canActivate: [authGuard] },
    { path: 'dashboard_admin/edit-worker/:id_users', component: EditWorker },
    { path: 'dashboard_admin/delete-worker/:id_users', component: DeleteWorker },
    { path: 'dashboard_admin/assigments', component: Assigments }



    //TODO: añaadir  canActivate: [authGuard] a CreateWorkers cuando el back esté conectado




];
