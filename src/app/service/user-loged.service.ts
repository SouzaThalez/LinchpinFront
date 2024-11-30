import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
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



  // global method allows calling on other components  
  getCurrentUser(): Observable<User>{

    return new Observable((subscription) => {
   
      if (this.user) {
        subscription.next(this.user);
        subscription.complete();
        return;
      }
  
      const localStorageID = localStorage.getItem('userID');
      const idConverted = Number(localStorageID);
  
      if (!idConverted) {
        console.warn('No user ID found in localStorage.');
        subscription.next(null);
        subscription.complete();
        return;
      }
  
      this.httpClient.get<User>("http://localhost:3000/Users/" + idConverted)
      .subscribe({
        next: (user: User) => {
          this.user = user;
          subscription.next(this.user);
          subscription.complete();
        },
        error: (error) => {
          console.error('Request to Users failed:', error);
          subscription.error(error);
          subscription.complete();
        }
      });
      
    });

  }

  logOut(){
    this.user = null;
  }


}
