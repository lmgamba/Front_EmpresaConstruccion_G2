import { Component, Input, SimpleChange } from '@angular/core';
import { IConstruction } from '../../../../interfaces/iconstruction';
import { IAssignments } from '../../../../interfaces/iassignments';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-assignment-card',
  imports: [CommonModule, DatePipe],
  templateUrl: './card-assignment.html',
  styleUrl: './card-assignment.css',
})
export class CardAssignment {
  @Input() assignment!: IAssignments;
  @Input() ArrayConstructions: IConstruction[] = []; // Recibimos la lista completa

  constructionName: string = 'Cargando...';

  ngOnChanges(changes: SimpleChange): void {
    this.matchName();
  }

  matchName() {
    // Solo buscamos si tenemos AMBOS datos
    if (this.assignment && this.ArrayConstructions.length > 0) {
      const found = this.ArrayConstructions.find(
        (c) => c.id_constructions == Number(this.assignment.constructionsSites_id),
      );

      this.constructionName = found
        ? found.name
        : 'Obra Desconocida (ID: ' + this.assignment.constructionsSites_id + ')';
    } else if (this.ArrayConstructions.length === 0) {
      // Opcional: Si la lista sigue vacía, mantenemos "Cargando..." o ponemos otra cosa
      this.constructionName = 'Cargando...';
    }
  }
}
