import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  expiresAt: string;
  user: User;
}

const TOKEN_KEY = 'token';
const USER_ID_KEY = 'userID';

@Injectable({
  providedIn: 'root'
})
export class UserLogedService {

  private user: User = null;

  constructor(private httpClient: HttpClient) {}

  /** Autentica no backend e guarda o token JWT. */
  login(login: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { login, password })
      .pipe(tap((response) => {
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_ID_KEY, response.user.id.toString());
        this.user = response.user;
      }));
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): Observable<User> {

    if (this.user) {
      return of(this.user);
    }

    if (!this.isLoggedIn()) {
      console.warn('No token found in localStorage.');
      return of(null);
    }

    return this.httpClient.get<User>(`${environment.apiUrl}/auth/me`)
      .pipe(tap((user) => this.user = user));
  }

  /** Força buscar o usuário de novo no backend (ex.: depois de editar o perfil). */
  refreshCurrentUser(): Observable<User> {
    this.user = null;
    return this.getCurrentUser();
  }

  logOut(){
    this.user = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }


}
