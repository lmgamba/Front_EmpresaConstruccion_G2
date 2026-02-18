import { Component } from '@angular/core';
import { IAssignments } from '../../../interfaces/iassignments';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignment-user',
  imports: [CommonModule],
  templateUrl: './assignment-user.html',
  styleUrl: './assignment-user.css',
})
export class AssignmentUser {
  // Usamos tu interfaz oficial
  assignments: IAssignments[] = [];
  userId: string = ''; // Ahora es string según tu interfaz

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      // Asumimos que el ID en localStorage viene como número o string, lo convertimos a string
      this.userId = JSON.parse(userString).id.toString();

      // this.cargarDatosPrueba();
      this.obtenerAsignacionesReales(); // Descomentar luego
    }
  }

  // --- DATOS DE PRUEBA (Adaptados a la Interfaz) ---
  cargarDatosPrueba() {
    this.assignments = [
      {
        id_assignments: 1,
        date_start: new Date('2026-02-12'), // La interfaz pide Date, usamos new Date()
        date_finish: new Date('2026-02-27'),
        status: 1,
        users_id: this.userId,
        constructionsSites_id: '2', // String
      },
      {
        id_assignments: 2,
        date_start: new Date('2025-08-27'),
        date_finish: new Date('2025-10-12'),
        status: 1,
        users_id: this.userId,
        constructionsSites_id: '2', // String
      },
      {
        id_assignments: 3,
        date_start: new Date('2023-01-21'),
        date_finish: new Date('2024-08-11'),
        status: 0,
        users_id: this.userId,
        constructionsSites_id: '1', // String
      },
      {
        id_assignments: 5,
        date_start: new Date('2024-04-14'),
        // @ts-ignore: Si tu interfaz obliga a que date_finish NO sea nulo,
        // tendrás que poner una fecha futura o cambiar la interfaz a "date_finish?: Date"
        // Aquí simulo que es una fecha lejana o null si la interfaz lo permitiera
        date_finish: new Date('2099-12-31'),
        status: 1,
        users_id: this.userId,
        constructionsSites_id: '2', // String
      },
    ];
  }

  // --- CONEXIÓN REAL ---
  obtenerAsignacionesReales() {
    // GET /assignments/user/{id}
    const apiUrl = `http://127.0.0.1:8000/assignments/user/${this.userId}`;

    this.http.get<IAssignments[]>(apiUrl).subscribe({
      next: (data) => {
        // NOTA: Al venir de una API, las fechas suelen ser Strings (ISO).
        // Angular las pinta bien igual, pero si necesitas operar con ellas,
        // tendrías que mapearlas: date_start: new Date(item.date_start)
        this.assignments = data;
      },
      error: (err) => console.error('Error:', err),
    });
  }
}
