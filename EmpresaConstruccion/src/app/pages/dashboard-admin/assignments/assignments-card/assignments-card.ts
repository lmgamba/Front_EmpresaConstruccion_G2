import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../../interfaces/iuser';
import { IConstruction } from '../../../../interfaces/iconstruction';
import { IAssignments } from '../../../../interfaces/iassignments';

@Component({
  selector: 'app-assignments-card',
  standalone: true,
  imports: [],
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



  get UserName(): string {
    const user = this.ArrayUsers.find(u => u.id_users === Number(this.assignment.users_id));
    return user ? `${user.name} ${user.surname}` : 'Sin usuario';
  }

  get ConstructionName(): string {
    const construction = this.ArrayConstructions.find(c => c.id_constructions === Number(this.assignment.constructionsSites_id));
    return construction ? construction.name : 'Sin obra';
  }


  onFinish() {
    if (this.assignment.status === 1) {
      this.finish.emit(this.assignment.id_assignments);
    }
  }
}
