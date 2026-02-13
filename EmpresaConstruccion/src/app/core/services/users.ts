import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { first, firstValueFrom } from 'rxjs';


type LoginResponse = {
  success: string,
  token: string,
  user: IUser
}

type DeleteUser = {
  name?: string,
  surname?: string,
  mail?: string,
  role?: string,
  active?: boolean
}

type UpdateUser = {
  name: string,
  surname: string,
  mail: string,
  role: string
  active: boolean
}

@Injectable({
  providedIn: 'root',
})

export class UserService {

  // para usar HttpCliente debe estar dentro del appconfig como provider
  private httpClient = inject(HttpClient);

  private baseUrl = 'http://127.0.0.1:8000/';

  register(newUser: IUser) {
    // el firstValueFrom lo transforma en promesa:
    return firstValueFrom(
      this.httpClient.post<{ success: string }>(`${this.baseUrl}/auth/register`, newUser)
    )
  }

  login(userLog: { email: string, password: string }) {
    // el firstValueFrom lo transforma en promesa:
    return firstValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/auth/login`, userLog)
    )
  }

  isLogged() {
    // estar logado en la app
    const token = localStorage.getItem('token');
    if (!token) return false
    return true
  }


  update(id_users: string, updatedUser: UpdateUser) {
    const token = localStorage.getItem('token');

    return firstValueFrom(this.httpClient.patch<{ success: string }>(
      `${this.baseUrl}/users/${id_users}`,
      updatedUser,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ));
  }


  getById(id_users: string) {
    const token = localStorage.getItem('token');

    return firstValueFrom(
      this.httpClient.get<IUser>(
        `${this.baseUrl}/users/${id_users}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    );
  }

  deactivate(id_users: string) {
    const token = localStorage.getItem('token');
    const payload: DeleteUser = { active: false };

    return firstValueFrom(this.httpClient.patch<{ success: string }>(
      `${this.baseUrl}/users/${id_users}`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ));
  }
}