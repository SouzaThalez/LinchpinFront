import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLogedService {

  logedUser: User;

  constructor(private httpClient : HttpClient) {
    let localStorageID = localStorage.getItem('userID');
    let idConverted = Number(localStorageID);
    this.getUsersFromJson(idConverted);
   }



   private getUsersFromJson(id:number){

    this.httpClient.get('http://localhost:3000/Users/' + id)
    .subscribe({
      //if request is true
        next: (sample: any)=>{
          this.logedUser = sample;
        },
      //if request is false
        error: (erro)=>{console.log('request to Users NOT good: ',erro);}
    })
  }



}
