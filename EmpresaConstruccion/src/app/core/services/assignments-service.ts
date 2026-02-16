import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IAssignments } from '../../interfaces/iassignments';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  private HttpClient = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/assignments';

  // obtener todas las asignaciones
  getAll(status?: string) {
    let params = new HttpParams();
    // filtrar por 'active' o 'finished'

    if (status) {
      params = params.set('status', status);
    }
    return firstValueFrom(
      this.HttpClient.get<IAssignments[]>(this.baseUrl, { params })
    );
  }

  // obtener asignaciones por usuario
  getAssignmentsByUserId(userId: number) {
    return firstValueFrom(
      this.HttpClient.get<IAssignments[]>(`${this.baseUrl}/user/${userId}`)
    );
  }

  // crear asignaciones
  create(assignment: Omit<IAssignments, 'id_assignments' | 'status'>) {
    return firstValueFrom(
      this.HttpClient.post<{ msg: string }>(`${this.baseUrl}/`, assignment)
      // {msg: string}, mensaje del backend
    );
  }

  // finalizar asignaciones
  finish(id_assignments: number) {
    return firstValueFrom(
      this.HttpClient.put(`${this.baseUrl}/${id_assignments}/finish`, {})
    );
  }
}
