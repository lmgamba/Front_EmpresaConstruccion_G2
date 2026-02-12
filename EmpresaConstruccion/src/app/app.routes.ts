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


export const routes: Routes = [
    // TODO: guards, 
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'dashboard_admin', component: DashboardAdmin },
    { path: 'dashboard_user', component: DashboardUser },
    { path: 'dashboard_admin/workers', component: Workers },
    { path: 'dashboard_admin/create-worker', component: CreateWorkers },
    { path: 'dashboard_admin/constructions', component: Constructions },


    //TODO: añaadir  canActivate: [authGuard] a CreateWorkers cuando el back esté conectado




];
