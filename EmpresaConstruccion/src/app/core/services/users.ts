import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { first, firstValueFrom } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

type LoginResponse = {
  success: string,
  token: string,
  //TODO USUARIO INTERFACE
  user:IUser
}

@Injectable({
  providedIn: 'root',
})
  
export class Users {

  // para usar HttpCliente debe estar dentro del appconfig como provider
  private httpClient = inject(HttpClient);

  private baseUrl = ''//TODO: URL api;

  registro(newUser: IUser) {
    // el firstValueFrom lo transforma en promesa:
    return firstValueFrom(
      this.httpClient.post<{ success: string }>(`${this.baseUrl}/registro`, newUser)
    )
  }


  login(userLog: { email: string, password: string }) {
    // el firstValueFrom lo transforma en promesa:
    return firstValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, userLog)
    )
  }
}