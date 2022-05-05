import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'https://portfolio-hormazabal.herokuapp.com/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }
}
