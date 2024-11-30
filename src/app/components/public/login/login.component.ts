import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  loginMessage = '';
  users: User[] = [];

  constructor(
    private router: Router,
    // private firebaseService: FirebaseService,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
  ){}

  ngOnInit(): void {

    this.getUsersFromJson();

  }

  
  getLoginInfo(userName: string, userPassword: string){
    
    let userFound = this.users.find((element: any)=> element.login == userName);
    if(userFound == null){
      this.loginMessage = 'Nome do usuário Icorreto!!';
    }else{
        if(userFound.login == userName && userFound.password == userPassword){
          this.loginMessage = 'Bem vindo!';
          //sending user id to local storage!
          let userID = userFound.id;
          let userStringID = userID.toString();
          localStorage.setItem('userID',userStringID);
          this.router.navigateByUrl('/private/home');
         
        }else{
          this.loginMessage = 'Senha Incorreta!';
        }
    }
  }


  private getUsersFromJson(){
    this.httpClient.get('http://localhost:3000/Users')
    .subscribe({
      //if request is true
        next: (sample: any)=>{
          this.users = sample;
        },
      //if request is false
        error: (erro)=>{console.log('request to Users NOT good: ',erro);}
    })
  }

}
