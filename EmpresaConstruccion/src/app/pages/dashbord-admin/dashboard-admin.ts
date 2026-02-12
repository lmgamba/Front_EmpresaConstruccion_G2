import { Component } from '@angular/core';
import { Workers } from './workers/workers';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/shared/navbar/navbar';
import { WorkersList } from '../../components/admin/workers-list/workers-list';
import { IUser } from '../../interfaces/iuser';


interface Metric {
  title: string;
  value: string;
  subtext: string;
}

interface Worker {
  id: number;
  name: string;
  role: string;
  initials: string;
  available: boolean;
}

interface Project {
  id: number;
  name: string;
  location: string;
  completion: number;
  status: 'On Track' | 'Delayed';
}

interface FeedItem {
  id: number;
  time: string;
  message: string;
}

@Component({
  selector: 'app-dashboard-admin',
  imports: [Workers, Navbar, WorkersList],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})


export class DashboardAdmin {

  // =========================
  // METRICS
  // =========================

  metrics: Metric[] = [
    {
      title: 'Active Projects',
      value: '12',
      subtext: '+2 from last month'
    },
    {
      title: 'On-site Workers',
      value: '45',
      subtext: '90% deployment rate today'
    },
    {
      title: 'Budget Utilization',
      value: '78%',
      subtext: '2 projects over budget'
    },
    {
      title: 'Pending Alerts',
      value: '4',
      subtext: 'Requires attention'
    }
  ];

  // =========================
  // WORKERS
  // =========================

 empleados: IUser[] = [
    {
      id_users: 1,
      name: 'Marcus',
      surname: 'Johnson',
      mail: 'marcus.j@constructora.com',
      password_hash: '$2b$10$n97aYc...', // Ejemplo de hash
      role: 'admin',
      created_at: new Date('2024-01-15'),
      status: true
    },
    {
      id_users: 2,
      name: 'Sarah',
      surname: 'Chen',
      mail: 'sarah.chen@constructora.com',
      password_hash: '$2b$10$p02bXd...',
      role: 'operario',
      created_at: new Date('2024-01-20'),
      status: false
    },
    {
      id_users: 3,
      name: 'David',
      surname: 'Miller',
      mail: 'd.miller@constructora.com',
      password_hash: '$2b$10$q88cXz...',
      role: 'operario',
      created_at: new Date('2024-02-01'),
      status: true
    },
    {
      id_users: 4,
      name: 'James',
      surname: 'Wilson',
      mail: 'j.wilson@constructora.com',
      password_hash: '$2b$10$m11dYw...',
      role: 'operario',
      created_at: new Date('2024-02-05'),
      status: true
    },
    {
      id_users: 5,
      name: 'Robert',
      surname: 'Fox',
      mail: 'robert.fox@constructora.com',
      password_hash: '$2b$10$z44fRt...',
      role: 'admin',
      created_at: new Date('2024-02-10'),
      status: false
    }
  ];

  // =========================
  // PROJECTS
  // =========================

  projects: Project[] = [
    {
      id: 1,
      name: 'Downtown Renovation',
      location: 'City Center',
      completion: 75,
      status: 'On Track'
    },
    {
      id: 2,
      name: 'Highway Extension',
      location: 'North Exit',
      completion: 45,
      status: 'Delayed'
    },
    {
      id: 3,
      name: 'Bridge Reconstruction',
      location: 'River District',
      completion: 60,
      status: 'On Track'
    }
  ];

  // =========================
  // SITE FEED
  // =========================

  feed: FeedItem[] = [
    {
      id: 1,
      time: '10 min ago',
      message: 'Material delivery confirmed for Downtown Renovation.'
    },
    {
      id: 2,
      time: '2 hours ago',
      message: 'Safety inspection alert triggered at North Exit.'
    },
    {
      id: 3,
      time: 'Yesterday',
      message: 'New worker assigned to Bridge Reconstruction.'
    }
  ];

}
