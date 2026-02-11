import { Component, signal, inject, Input } from '@angular/core';
import { UserService } from '../../../core/services/users';
import { IUser } from '../../../interfaces/iuser';

@Component({
  selector: 'user_card',
  imports: [],
  templateUrl: './user_card.html',
  styleUrl: './user_card.css',
})
export class UsersCard {

  @Input() user: IUser = {
    id_users: 0,
    name: "",
    surname: "",
    mail: "",
    password_hash: "",
    role: "",
    status: true
  };


}
