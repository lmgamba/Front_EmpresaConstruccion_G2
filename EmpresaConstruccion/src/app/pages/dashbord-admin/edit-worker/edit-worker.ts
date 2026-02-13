import { UserService } from './../../../core/services/users';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-worker',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-worker.html',
  styleUrl: './edit-worker.css',
})
export class EditWorker {

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  // inyectamos ActivateRoute para leer el id que viene en la URL
  router = inject(Router);
  // inyectamos Router para poder redirigir después de actualizar

  id_users!: string;
  // guardamos id del trabajador

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    mail: new FormControl(),
    role: new FormControl()
  })

  async ngOnInit() {
    this.id_users = this.route.snapshot.paramMap.get('id_users')!;
    console.log(this.id_users)
    // obtener id desde URL

    try {
      const worker = await this.userService.getById(this.id_users);
      this.form.patchValue(worker);
      
    } catch (error) {
      Swal.fire({
        title: 'Mistake!',
        text: 'Could not load worker data',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }


  }

  async onSubmit() {
    try {
      await this.userService.update(this.id_users, this.form.value);

      Swal.fire({
        title: 'Updated!',
        text: 'Worker updated sucessfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } catch (error) {
      Swal.fire({
        title: 'Mistake!',
        text: 'There was a problem updating the worker',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }


}
