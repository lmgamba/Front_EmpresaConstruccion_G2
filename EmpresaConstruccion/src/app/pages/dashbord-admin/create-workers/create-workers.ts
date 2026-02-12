import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './../../../core/services/users';
import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-workers',
  imports: [ReactiveFormsModule
  ],
  templateUrl: './create-workers.html',
  styleUrl: './create-workers.css',
})
export class CreateWorkers {

  UserService = inject(UserService);
  //injectamos el servicio

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    mail: new FormControl(),
    password: new FormControl(), //TODO: el admin no debe crear el password del worker, se asignará sola inicialmente
    role: new FormControl()
  });

  async onSubmit() {
    //this.form.value
    try {
      const response = await this.UserService.register(this.form.value);
      // Resolución positiva
      Swal.fire({
        title: 'New worker!',
        text: 'Create new worker succesfully!',
        icon: 'success',
        confirmButtonText: 'Oh yeah'
      })

    } catch (error) {
      // Resolución negativa
      Swal.fire({
        title: 'Mistake!',
        text: 'There are mistakes in your form, please check it!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }


  }
}
