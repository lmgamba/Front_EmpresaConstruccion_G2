import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../../interfaces/iuser';
import { IConstruction } from '../../interfaces/iconstruction';

@Injectable({
  providedIn: 'root',
})
export class ConstructionService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/constructions';

  /**
   * Obtener todas las obras. 
   * @param status Opcional: filtrar por 'active', 'completed', etc.
   */
  getAll(status?: string) {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    
    return firstValueFrom(
      this.httpClient.get<IConstruction[]>(`${this.baseUrl}/`, { params })
    );
  }

  /**
   * Crear una obra nueva (solo admin)
   */
  create(construction: Omit<IConstruction, 'id_constructions' | 'status'>) {
    return firstValueFrom(
      this.httpClient.post<{ msg: string }>(`${this.baseUrl}/`, construction)
    );
  }

  /**
   * Actualizar una obra existente
   */
  update(id: number, construction: Partial<IConstruction>) {
    return firstValueFrom(
      this.httpClient.put<{ msg: string }>(`${this.baseUrl}/${id}`, construction)
    );
  }

  /**
   * Eliminar una obra (Solo si no tiene asignaciones activas)
   */
  delete(id: number) {
    return firstValueFrom(
      this.httpClient.delete<{ msg: string }>(`${this.baseUrl}/${id}`)
    );
  }

  /**
   * Obtener lista de trabajadores asignados a una obra específica
   */
  getWorkers(id: number) {
    return firstValueFrom(
      this.httpClient.get<IUser[]>(`${this.baseUrl}/${id}/workers`)
    );
  }
}