import { Component, signal, inject, Input } from '@angular/core';
import { UsersCard } from '../user_card/user_card';
import { IUser } from '../../../interfaces/iuser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'workers-list',
  imports: [UsersCard, RouterLink],
  templateUrl: './workers-list.html',
  styleUrl: './workers-list.css',
})
export class WorkersList {

  // =========================
  // workers-list
  // =========================

 @Input() editOptions: boolean = false; // Controla si se muestran las opciones de editar/eliminar

  @Input() ArrayUsers: IUser[] = [];



}