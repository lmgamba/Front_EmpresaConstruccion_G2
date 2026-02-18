import { Component, Input } from '@angular/core';
import { ILogs } from '../../../interfaces/ilogs';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './log-card.html',
  styleUrl: './log-card.css',
})
  
export class LogCard {
  @Input() log!: ILogs;

  editMode: boolean = false;

  onEdit() {

    this.editMode = true;
    
    console.log('Editando log:', this.log.id_logs);
  }
}