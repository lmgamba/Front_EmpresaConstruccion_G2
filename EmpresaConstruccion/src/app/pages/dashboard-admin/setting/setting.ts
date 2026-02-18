import { TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting-admin',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class SettingAdmin {
  settingsForm: FormGroup;
  userId: number = 0;
  userInitials: string = '??'; // Para el círculo (Ej: RP)
  userRole: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    // 1. Inicializamos el formulario vacío
    this.settingsForm = this.fb.group({
      name: [''], // Nombre
      surname: [''], // Apellido
      email: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    // 2. Recuperamos el ID del Token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));

        this.userId = payload.id_users || payload.sub;

        this.loadUserData();
      } catch (error) {
        console.error('Error decodificando token:', error);
      }
    }
  }

  loadUserData() {
    // Petición al Backend: GET /users/18
    this.http.get<any>(`http://127.0.0.1:8000/users/${this.userId}`).subscribe({
      next: (data) => {
        // 4. Rellenamos el formulario con los datos de la BD
        this.settingsForm.patchValue({
          name: data.name,
          surname: data.surname,
          email: data.mail,
        });

        this.userRole = data.role || 'Operario';
        this.userInitials = (data.name[0] + data.surname[0]).toUpperCase();
      },
      error: (e) => console.error('Error cargando perfil:', e),
    });
  }
}
