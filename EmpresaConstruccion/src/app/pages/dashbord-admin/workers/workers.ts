import { Component, signal, inject, Input } from '@angular/core';
import { UsersCard } from '../../../components/admin/user_card/user_card';
import { WorkersList } from '../../../components/admin/workers-list/workers-list';
import { IUser } from '../../../interfaces/iuser';
import { UserService } from '../../../core/services/users-service';
import { SiteCard } from "../constructions/site-card/site-card";
import { IConstruction } from '../../../interfaces/iconstruction';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-workers',
  imports: [WorkersList, SiteCard, RouterLink],
  templateUrl: './workers.html',
  styleUrl: './workers.css',
})
export class Workers {


  userService = inject(UserService);

  
  @Input() ArrayConstructions: IConstruction[] = [];


  async ngOnInit() {
    // getAll no devuelve el arreglo del user!!! Devuelve una promesa, y cuando la resuelve si devuelve el array
    //const response = await this.userService.getAll();
    //console.log(response)
    //this.arruser.set(response)
  }

// ARRAYS PARA PRUEBA, BORRAR DEPSUES DE CONECTAR EL BACK


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
    },
    {
      id_users: 6,
      name: 'Elena',
      surname: 'Rodriguez',
      mail: 'elena.r@constructora.com',
      password_hash: '$2b$10$v99gHj...',
      role: 'operario',
      created_at: new Date('2024-02-15'),
      status: false
    },
    {
      id_users: 7,
      name: 'Thomas',
      surname: 'Shelby',
      mail: 't.shelby@constructora.com',
      password_hash: '$2b$10$k33jKl...',
      role: 'operario',
      created_at: new Date('2024-02-18'),
      status: true
    },
    {
      id_users: 8,
      name: 'Linda',
      surname: 'Belcher',
      mail: 'linda.b@constructora.com',
      password_hash: '$2b$10$x11mMn...',
      role: 'admin',
      created_at: new Date('2024-02-20'),
      status: true
    }
  ];


 constructions: IConstruction[] = [
  {
    id_constructions: 1,
    name: 'Downtown Plaza',
    description: 'Structural reinforcement and interior remodeling of the main commercial hall.',
    address: '124 Broadway, NY',
    latitude: 40.712776,
    longitude: -74.005974,
    status: 'In progress'
  },
  {
    id_constructions: 2,
    name: 'Skyline Tower',
    description: 'Foundations and initial structure for a 20-story residential building.',
    address: '450 W 42nd St, NY',
    latitude: 40.759243,
    longitude: -73.991409,
    status: 'Soon'
  },
  {
    id_constructions: 3,
    name: 'East River Bridge',
    description: 'Maintenance of suspension cables and surface repainting.',
    address: 'Brooklyn Bridge, NY',
    latitude: 40.706086,
    longitude: -73.996864,
    status: 'Ending'
  },
  {
    id_constructions: 4,
    name: 'Central Park Pavilion',
    description: 'Complete restoration of the historical wooden structure.',
    address: 'Central Park, NY',
    latitude: 40.781219,
    longitude: -73.966514,
    status: 'Finished'
  },
  {
    id_constructions: 5,
    name: 'Harbor Warehouse',
    description: 'Demolition of old piers and construction of a new logistics center.',
    address: 'Pier 40, NY',
    latitude: 40.729729,
    longitude: -74.011505,
    status: 'In progress'
  },
  {
    id_constructions: 6,
    name: 'Uptown Medical Center',
    description: 'Final phase of electrical and plumbing installation in the North Wing.',
    address: '168th St & Broadway, NY',
    latitude: 40.841523,
    longitude: -73.939281,
    status: 'Ending'
  }
];


}