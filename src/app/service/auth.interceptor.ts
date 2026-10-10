import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Envia o token JWT nas chamadas ao backend e volta para o login se a sessão expirar.
 * Lê o localStorage direto (e não o UserLogedService) para evitar dependência circular com o HttpClient.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    const isApiRequest = request.url.startsWith(environment.apiUrl);

    if (token && isApiRequest) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (isApiRequest && error.status === 401 && !request.url.endsWith('/auth/login')) {
          localStorage.removeItem('token');
          localStorage.removeItem('userID');
          this.router.navigateByUrl('/login');
        }
        return throwError(() => error);
      })
    );
  }
}
