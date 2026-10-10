import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

/** CRUD de usuários no linchpin-backend. */
@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly url = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  list(role?: string): Observable<User[]> {
    const params = role ? new HttpParams().set('role', role) : undefined;
    return this.httpClient.get<User[]>(this.url, { params });
  }

  create(user: Partial<User>): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/${id}`, user);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
