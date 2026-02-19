import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/users-service';
import { AuthService } from '../../../core/services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Settings {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  settingsForm: FormGroup;
  userId!: number;
  userInitials: string = '??';
  userRole: string = '';

  constructor() {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      current_password: [''], // Solo obligatorio si cambia password
      new_password: ['']
    });
  }

  ngOnInit(): void {
    const id = this.authService.getCurrentUserId();
    if (id) {
      this.userId = id;
      this.loadUserData();
    }
  }

  async loadUserData() {
    try {
      const data = await this.userService.getById(this.userId.toString());
      this.settingsForm.patchValue({
        name: data.name,
        surname: data.surname,
        mail: data.mail,
      });
      this.userRole = data.role || 'User';
      this.userInitials = (data.name[0] + data.surname[0]).toUpperCase();
    } catch (e) {
      console.error('Error cargando perfil:', e);
    }
  }

  async onSubmit() {
  // 1. Extraemos los valores del formulario
  const formValues = this.settingsForm.value;

  // 2. Creamos un objeto "limpio" solo con los datos básicos
  const updateData: any = {
    name: formValues.name,
    surname: formValues.surname,
    mail: formValues.mail
  };

  // 3. LÓGICA DE FILTRADO: ¿Hay nueva contraseña?
  if (formValues.new_password && formValues.new_password.trim() !== "") {
    
    // Si hay nueva, pero no puso la actual, detenemos todo
    if (!formValues.current_password) {
      Swal.fire('Atención', 'Ingresa tu contraseña actual para validar el cambio', 'warning');
      return;
    }

    // Si todo está ok, los añadimos al objeto de envío
    updateData.password = formValues.new_password; 
    updateData.current_password = formValues.current_password;
  }

  // 4. Ahora enviamos updateData (que solo tiene password si fue necesario)
  try {
    await this.userService.update(this.userId.toString(), updateData);
    
    Swal.fire('¡Éxito!', 'Datos actualizados correctamente', 'success');
    
    // Si hubo cambio de pass, limpiar esos campos específicos
    this.settingsForm.patchValue({ current_password: '', new_password: '' });
    
  } catch (error) {
    Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
  }
}
}