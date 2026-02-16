import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ILogs } from '../../interfaces/ilogs'; 


@Injectable({
  providedIn: 'root'
})
export class LogService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/logs';

  // Crear un nuevo log.
  create(log: ILogs) {
    return firstValueFrom(
      this.httpClient.post<{ msg: string }>(`${this.baseUrl}/`, log)
    );
  }

  // Obtener todos los logs de una obra específica (Solo Admin)

  getByConstruction(constructionId: number) {
    return firstValueFrom(
      this.httpClient.get<ILogs[]>(`${this.baseUrl}/construction/${constructionId}`)
    );
  }

  // Obtener todos los logs realizados por un usuario específico (Solo Admin)

  getByUser(userId: number) {
    return firstValueFrom(
      this.httpClient.get<ILogs[]>(`${this.baseUrl}/user/${userId}`)
    );
  }
}