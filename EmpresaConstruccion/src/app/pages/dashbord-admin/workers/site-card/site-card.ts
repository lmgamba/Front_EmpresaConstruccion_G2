import { Component, signal, inject, Input } from '@angular/core';
import { UsersCard } from '../../../../components/admin/user_card/user_card';
import { WorkersList } from '../workers-list/workers-list';
import { IUser } from '../../../../interfaces/iuser';

@Component({
  selector: 'site-card',
  imports: [UsersCard, WorkersList],
  templateUrl: './site-card.html',
  styleUrl: './site-card.css',
})
export class SiteCard {

  // =========================
  // site-card
  // =========================

  @Input() ArrayUsers: IUser[] = [];



}