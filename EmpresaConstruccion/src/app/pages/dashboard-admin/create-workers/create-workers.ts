import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-workers',
  imports: [ReactiveFormsModule
  ],
  templateUrl: './create-workers.html',
  styleUrl: './create-workers.css',
})
export class CreateWorkers {

  router = inject(Router);
  AuthService = inject(AuthService);
  //injectamos el servicio

  route = inject(ActivatedRoute);
  // inyectamos ActivateRoute para leer el id que viene en la URL

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    mail: new FormControl(),
    password: new FormControl(), 
    //TODO: el admin no debe crear el password del worker, se asignará sola inicialmente
    role: new FormControl()
  });

  async onSubmit() {
    //this.form.value
    try {
      const response = await this.AuthService.register(this.form.value);
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
