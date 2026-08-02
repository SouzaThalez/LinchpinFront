import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserLogedService {

  private user: User = null;
  
  constructor(private httpClient: HttpClient) {
    this.getCurrentUser();
  }

  getCurrentUser(): Observable<User> {
    return new Observable((subscription) => {

      if (this.user) {
      
        subscription.next(this.user);
        subscription.complete();
        return;
      }
      // O get do localStorage retorna String sempre, id=string
      const id = localStorage.getItem('userID');
  

      if (!id) {
        console.warn('No user ID found in localStorage.');
        subscription.next(null);
        subscription.complete();
        return;
      }
      
      //O id aqui ja é interpretado como string, porque vira parte do URL
      //Nessa caso nao precisa converter
      this.httpClient.get<User>(`http://localhost:3000/Users/${id}`)
        .subscribe({
          next: (user) => {
            this.user = user;
            subscription.next(this.user);
            subscription.complete();
          },
          error: (error) => {
            console.error('Request failed:', error);
            subscription.error(error);
          }
        });
    });
}

  logOut(){
    this.user = null;
  }


}
