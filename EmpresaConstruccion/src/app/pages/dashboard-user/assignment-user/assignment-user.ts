import { Component, OnInit } from '@angular/core';
import { IAssignments } from '../../../interfaces/iassignments';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IConstruction } from '../../../interfaces/iconstruction';
import { CardAssignment } from './card-assignment/card-assignment';

@Component({
  selector: 'app-assignment-user',
  imports: [CommonModule, CardAssignment],
  templateUrl: './assignment-user.html',
  styleUrl: './assignment-user.css',
})
export class AssignmentUser implements OnInit {
  myAssignments: IAssignments[] = [];
  allConstructions: IConstruction[] = [];
  userId: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // 1. buscamos el TOKEN
    const token = localStorage.getItem('token');

    if (token) {
      // 2. Decodificamos el token (es un JWT, tiene 3 partes separadas por puntos)
      // La parte 1 (índice 1) es el payload con los datos
      try {
        const payloadBase64 = token.split('.')[1];
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        // 3. Sacamos el ID del payload
        this.userId = Number(payload.id_users || payload.sub || payload.user_id);

        console.log('ID recuperado del token:', this.userId);

        // 4. Cargamos los datos
        this.loadConstructions();
        this.loadMyAssignments();
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No hay token guardado. Haz login de nuevo.');
    }
  }

  loadMyAssignments() {
    // Petición al backend para sacar SOLO las asignaciones del usuario 18
    this.http
      .get<IAssignments[]>(`http://127.0.0.1:8000/assignments/user/${this.userId}`)
      .subscribe({
        next: (data) => {
          console.log('Asignaciones recibidas:', data);
          this.myAssignments = data;
        },
        error: (e) => console.error('Error cargando assignments:', e),
      });
  }

  loadConstructions() {
    // Necesitamos TODAS las obras para saber qué nombre tiene la obra ID 2
    this.http.get<IConstruction[]>('http://127.0.0.1:8000/constructions').subscribe({
      next: (data) => {
        console.log('Obras recibidas:', data);
        this.allConstructions = data;
      },
      error: (e) => console.error('Error cargando obras:', e),
    });
  }
}
