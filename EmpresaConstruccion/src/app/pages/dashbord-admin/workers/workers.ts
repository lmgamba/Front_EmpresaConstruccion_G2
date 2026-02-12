import { Component, signal, inject, Input } from '@angular/core';
import { UsersCard } from '../../../components/admin/user_card/user_card';
import { WorkersList } from '../../../components/admin/workers-list/workers-list';
import { IUser } from '../../../interfaces/iuser';
import { UserService } from '../../../core/services/users';
import { SiteCard } from "../../../components/admin/constructions/site-card/site-card";


@Component({
  selector: 'app-workers',
  imports: [WorkersList, SiteCard],
  templateUrl: './workers.html',
  styleUrl: './workers.css',
})
export class Workers {

  // =========================
  // WORKERS
  // =========================


  @Input() n_max: number = 3;
  userService = inject(UserService);


  async ngOnInit() {
    // getAll no devuelve el arreglo del user!!! Devuelve una promesa, y cuando la resuelve si devuelve el array
    //const response = await this.userService.getAll();
    //console.log(response)
    //this.arruser.set(response)
  }

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




}