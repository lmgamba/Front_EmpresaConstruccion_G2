import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { first, firstValueFrom } from 'rxjs';


type LoginResponse = {
  success: string,
  token: string,
  user: IUser
}

@Injectable({
  providedIn: 'root',
})

export class UserService {

  // para usar HttpCliente debe estar dentro del appconfig como provider
  private httpClient = inject(HttpClient);

  private baseUrl = ''//TODO: URL api;

  register(newUser: IUser) {
    // el firstValueFrom lo transforma en promesa:
    return firstValueFrom(
      this.httpClient.post<{ success: string }>(`${this.baseUrl}/register`, newUser)
    )
  }


  login(userLog: { email: string, password: string }) {
    // el firstValueFrom lo transforma en promesa:
    return firstValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, userLog)
    )
  }

  isLogged() {
    // estar logado en la app
    const token = localStorage.getItem('token');
    if (!token) return false
    return true
  }

  update(id_users: string) {
    return firstValueFrom
      (this.httpClient.patch<{ success: string }>(this.baseUrl, id_users));
  }

  getById(id_users: string) {
    return firstValueFrom(
      this.httpClient.get<>(this.baseUrl);
    )
  }
}