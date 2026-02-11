import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  router = inject(Router);

  usersService = inject(UserService);

  registerFrom: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  async onSubmit() {
    //this.registerFrom.value = > valores del form
    try {
      //TODO 
      //const response = await this.usersService.register(this.registerFrom.value);
      //console.log(response)
      //redireccion al login
      this.router.navigateByUrl('/login')
    } catch (error) {

    }
  }

}
