import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  router = inject(Router)
  AuthService = inject(AuthService);


  loginForm: FormGroup = new FormGroup({
    mail: new FormControl(),
    password: new FormControl()
  });


  async onSubmit() {
    //this.registroFrom.value = > valores del form
    try {
      const response = await this.AuthService.login(this.loginForm.value);
      console.log(response)

      localStorage.setItem('token', response.token)
      //redireccion a la pagina correspondiente segun el rol
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      Swal.fire({
                title: 'Mistake!',
                text: 'There was a problem logging in, please check your credentials and try again',
                icon: 'error',
                confirmButtonText: 'Ok',
              });
    }
  }
}
