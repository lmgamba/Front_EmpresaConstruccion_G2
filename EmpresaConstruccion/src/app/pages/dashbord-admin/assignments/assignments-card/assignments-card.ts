import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersCard } from '../../../../components/admin/user_card/user_card';
import { SiteCard } from '../../constructions/site-card/site-card';
import { IUser } from '../../../../interfaces/iuser';
import { IConstruction } from '../../../../interfaces/iconstruction';
import { IAssignments } from '../../../../interfaces/iassignments';

@Component({
  selector: 'app-assignments-card',
  standalone: true,
  imports: [UsersCard, SiteCard],
  templateUrl: './assignments-card.html',
  styleUrl: './assignments-card.css',
})
export class AssignmentsCard {

  // =========================
  // assignment-card
  // =========================

  // lista de usuarios
  @Input() ArrayUsers: IUser[] = [];

  // lista de construcciones
  @Input() ArrayConstructions: IConstruction[] = [];

  // mostrar asignación
  @Input() assignment: IAssignments = {
    id_assignments: 0,
    date_start: new Date(),
    date_finish: new Date(),
    status: 1,
    users_id: '',
    constructionsSites_id: ''
  };

  // finalizar asignación
  @Output() finish = new EventEmitter<number>();

  onFinish() {
    if (this.assignment.status === 1) {
      this.finish.emit(this.assignment.id_assignments);
    }
  }


}
