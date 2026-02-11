import { Component } from '@angular/core';
import { Workers } from './workers/workers';
import { RouterLink, RouterOutlet } from '@angular/router';


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
  imports: [Workers, RouterOutlet, RouterLink],
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

  workers: Worker[] = [
    {
      id: 1,
      name: 'Marcus Johnson',
      role: 'Foreman',
      initials: 'MJ',
      available: true
    },
    {
      id: 2,
      name: 'Sarah Connor',
      role: 'Safety Officer',
      initials: 'SC',
      available: false
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'Electrician',
      initials: 'DC',
      available: true
    },
    {
      id: 4,
      name: 'John Doe',
      role: 'Plumber',
      initials: 'JD',
      available: true
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
