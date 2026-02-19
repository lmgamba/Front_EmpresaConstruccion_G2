import { AssignmentsService } from '../../../core/services/assignments-service';
import { ConstructionService } from '../../../core/services/constructions-service';
import { UserService } from '../../../core/services/users-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AssignmentsCard } from './assignments-card/assignments-card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../interfaces/iuser';
import { IConstruction } from '../../../interfaces/iconstruction';
import { IAssignments } from '../../../interfaces/iassignments';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [AssignmentsCard, ReactiveFormsModule, CommonModule],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
})
export class Assignments implements OnInit {
  private UserService = inject(UserService);
  private ConstructionService = inject(ConstructionService);
  private AssignmentsService = inject(AssignmentsService);


  // Datos para select
  ArrayUsers = signal<IUser[]>([]);
  ArrayConstructions = signal<IConstruction[]>([]);
  assignments = signal<IAssignments[]>([]);


  // formulario
  registerForm: FormGroup = new FormGroup({
    users_id: new FormControl('', Validators.required),
    constructionsSites_id: new FormControl('', Validators.required),
    date_start: new FormControl('', Validators.required),
    date_finish: new FormControl(''), //opcional
  });


  async ngOnInit() {
    await this.loadUsers();
    await this.loadConstructions();
    await this.loadAssignments();
  }

  // cargamos users
  async loadUsers() {
    try {
      const response = await this.UserService.getAll();
      this.ArrayUsers.set(response);
      console.log('usuarios cargados', this.ArrayUsers());
    } catch (error) {
      console.error('Mistake loading users', error);
    }
  }

  // cargamos constructions
  async loadConstructions() {
    try {
      const response = await this.ConstructionService.getAll();
      this.ArrayConstructions.set(response);
    } catch (error) {
      console.error('Mistake loading constructions', error);
    }
  }

  // cargamos assignments
  async loadAssignments() {
    try {
      const response = await this.AssignmentsService.getAll();
      this.assignments.set(response);
    } catch (error) {
      console.error('Mistake loading assignments', error);
    }
  }

  // crear nueva asignación
  async onSubmit() {
    if (this.registerForm.invalid) {
      Swal.fire({
        title: 'Mistake!',
        text: 'Complete the required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    try {
      await this.AssignmentsService.create(this.registerForm.value as Omit<IAssignments, 'id_assignments' | 'status'>);
      Swal.fire({
        title: 'Assignment registered!',
        text: 'Assingment registered successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      this.registerForm.reset(); //Borrar formulario
      await this.loadAssignments();

    } catch (error) {
      Swal.fire({
        title: 'Mistake!',
        text: 'The assignment could not be created',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  // finalizar asignación
  async finishAssignment(id_assignments: number) {
    try {
      await this.AssignmentsService.finish(id_assignments);
      Swal.fire({
        title: 'Updated assignment!',
        text: 'Assignment completed',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      await this.loadAssignments();
    } catch (error) {
      Swal.fire({
        title: 'Mistake!',
        text: 'The assignment could not be completed',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }


}
