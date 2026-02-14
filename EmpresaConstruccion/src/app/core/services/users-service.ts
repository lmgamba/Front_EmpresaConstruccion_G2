import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/users';

    /**
   * Obtener todas las obras. 
   * @param status Opcional: filtrar por status true o false, etc.
   */
  getAll(status?: string) {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    
    return firstValueFrom(
      this.httpClient.get<IUser[]>(`${this.baseUrl}/`, { params })
    );
  }

  update(id_users: string, updatedUser: Partial<IUser>) {
    return firstValueFrom(
      this.httpClient.patch<{ success: string }>(`${this.baseUrl}/${id_users}`, updatedUser)
    );
  }

  getById(id_users: string) {
    return firstValueFrom(
      this.httpClient.get<IUser>(`${this.baseUrl}/${id_users}`)
    );
  }

  deactivate(id_users: string) {
    return firstValueFrom(
      this.httpClient.put<{ success: string }>(`${this.baseUrl}/${id_users}`, { status: false })
    );
  }
}