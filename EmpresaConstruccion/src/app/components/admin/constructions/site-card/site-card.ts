import { Component, signal, inject, Input } from '@angular/core';
import { UsersCard } from '../../user_card/user_card';
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
    name: "Name",
    description: "",
    address: "124 Broadway, NY",
    latitude: 0,
    longitude: 0,
    status: "In Process"
  };



}



