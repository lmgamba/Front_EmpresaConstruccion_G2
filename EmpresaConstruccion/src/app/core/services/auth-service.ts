import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/auth';

  // rgistro de nuevos usuarios
  register(newUser: IUser) {
    return firstValueFrom(
      this.httpClient.post<{ success: string }>(`${this.baseUrl}/register`, newUser)
    );
  }

  // LOGIN: Ahora solo guardamos el token (ya que el user viene incompleto/undefined)
  login(userLog: { mail: string; password: string }) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, userLog)
    ).then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
      }
      return res;
    });
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  // !! Importante!! : (sin esto no sirve el admin guard) Decodifica el rol directamente desde el JWT para evitar errores de JSON
  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64); 
      const payload = JSON.parse(payloadJson); 
      
      return payload.role || null; 
    } catch (e) {
      console.error("Error al obtener el rol del token:", e);
      return null;
    }
  }

  // saber el id del ususario logueado
getCurrentUserId(): number | null {
  const userData = localStorage.getItem('user_data'); // O como lo llames
  if (userData) {
    const user = JSON.parse(userData);
    return user.id_users; // Asegúrate de que el nombre coincida con tu objeto
  }
  return null;
}

  logout() {
    localStorage.removeItem('token');
  }
}