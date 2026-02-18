import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  router = inject(Router);

  AuthService = inject(AuthService);

  registerFrom: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  async onSubmit() {
    this.registerFrom.value
    try {
      //TODO 
      const response = await this.AuthService.register(this.registerFrom.value);
      console.log(response)
      //redireccion al login
      this.router.navigateByUrl('dashboard')
    } catch (error) {
Swal.fire({
                title: 'Mistake!',
                text: 'There was a problem crwating your account, please check the data and try again',
                icon: 'error',
                confirmButtonText: 'Ok',
              });
    }
  }

}
