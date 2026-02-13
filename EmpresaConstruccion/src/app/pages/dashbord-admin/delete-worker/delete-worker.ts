import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/users';
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
  route = inject(ActivatedRoute);
  userService = inject(UserService);

  id_users!: string;
  

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    mail: new FormControl(),
    role: new FormControl(),
  });

  async ngOnInit() {
    this.id_users = this.route.snapshot.paramMap.get('id_users')!;
    // obtener id desde URL

    try {
      const worker = await this.userService.getById(this.id_users);
      // Rellenamos el formulario con los datos del trabajador para ver a quién borramos
      this.form.patchValue(worker);

      // Deshabilitamos el formulario para que sea solo de lectura (opcional pero recomendado)
      this.form.disable();
    } catch (error) {
      Swal.fire({
        title: 'Mistake!',
        text: 'Could not load worker data',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  async onSubmit() {
    // 1. Preguntar confirmación antes de borrar
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
        await this.userService.deactivate(this.id_users);

        await Swal.fire({
          title: 'Deactivated!',
          text: 'Worker deactivated successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        // 3. Redirigir al panel de administración (importante tras borrar)
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
