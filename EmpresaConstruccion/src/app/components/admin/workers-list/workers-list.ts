import { Component, signal, inject, Input } from '@angular/core';
import { UsersCard } from '../user_card/user_card';
import { IUser } from '../../../interfaces/iuser';

@Component({
  selector: 'workers-list',
  imports: [UsersCard],
  templateUrl: './workers-list.html',
  styleUrl: './workers-list.css',
})
export class WorkersList {

  // =========================
  // workers-list
  // =========================


  @Input() n_max: number = 3;

  @Input() ArrayUsers: IUser[] = [];



}