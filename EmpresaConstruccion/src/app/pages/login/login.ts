import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Users } from '../../core/services/users';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  router= inject(Router)
  UsersService = inject(Users);


   loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
   });
  
  
    async onSubmit() {
    //this.registroFrom.value = > valores del form
      try {
      //TODO user service
      const response = await this.UsersService.login(this.loginFrom.value);
      console.log(response)

      //guardar TOKEN (en LocalStorage = espacio en el navegador). Para ello se usa localStorage.setItem(key: string, value:-)
      localStorage.setItem('token', response.token)
      //redireccion a la pagina con permisos -0> pag empleados
      this.router.navigateByUrl('/empleados')
    } catch (error) {
      alert('Se ha producido un error')
    }
  }
}
