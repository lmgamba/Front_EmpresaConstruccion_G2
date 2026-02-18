import { IUser } from './../../../interfaces/iuser';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/users-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-worker',
  imports: [ReactiveFormsModule],
  templateUrl: './delete-worker.html',
  styleUrl: './delete-worker.css',
})
export class DeleteWorker {
  router = inject(Router);
  //route = inject(ActivatedRoute);
  userService = inject(UserService);

  // lista usuarios
  ArrayUsers = signal<IUser[]>([]);
  // usuario seleccionado
  selectedUser = signal<IUser | null>(null);


  form: FormGroup = new FormGroup({
    selectedUser: new FormControl()
  });


  async ngOnInit() {

    try {

      const workers = await this.userService.getAll();

      this.ArrayUsers.set(workers);

    } catch (error) {

      Swal.fire({
        title: 'Mistake!',
        text: 'Could not load workers',
        icon: 'error',
        confirmButtonText: 'Ok',
      });

    }

  }


  async onUserSelect(event: any) {

    const id = Number(event.target.value);

    const worker = this.ArrayUsers().find(
      user => user.id_users === id
    );

    if (worker) {
      this.selectedUser.set(worker);
    }

  }

  async onSubmit() {

    if (!this.selectedUser()) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to deactivate this worker!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, deactivate it!',
    });

    if (result.isConfirmed) {

      try {

        await this.userService.deleteUser(this.selectedUser()!.id_users);

        await Swal.fire({
          title: 'Deactivated!',
          text: 'Worker deactivated successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        this.router.navigate(['/dashboard_admin']);

      } catch (error) {

        Swal.fire({
          title: 'Mistake!',
          text: 'There was a problem deactivating the worker',
          icon: 'error',
          confirmButtonText: 'Ok',
        });

      }

    }

  }

}