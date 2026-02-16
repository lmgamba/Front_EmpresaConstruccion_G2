import { Component, signal, inject, Input } from '@angular/core';
import { UsersCard } from '../../../../components/admin/user_card/user_card';
import { IUser } from '../../../../interfaces/iuser';
import { IConstruction } from '../../../../interfaces/iconstruction';

@Component({
  selector: 'site-card',
  imports: [UsersCard],
  templateUrl: './site-card.html',
  styleUrl: './site-card.css',
})
export class SiteCard {

  // =========================
  // site-card
  // =========================

  @Input() ArrayUsers: IUser[] = [];


  @Input() construction: IConstruction = {
    id_constructions: 0,
    name: "",
    description: "",
    address: "",
    latitude: 0,
    longitude: 0
  };



}



