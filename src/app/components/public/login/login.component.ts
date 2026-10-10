import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogedService } from '../../../service/user-loged.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginMessage = '';

  constructor(
    private router: Router,
    private userLogedService: UserLogedService,
  ){}


  getLoginInfo(userName: string, userPassword: string){

    if(!userName || !userPassword){
      this.loginMessage = 'Informe usuário e senha!';
      return;
    }

    //A validação de usuário e senha agora é feita no backend
    this.userLogedService.login(userName.trim(), userPassword)
    .subscribe({
      next: () => {
        this.loginMessage = 'Bem vindo!';
        this.router.navigateByUrl('/private/home');
      },
      error: (erro: HttpErrorResponse) => {
        this.loginMessage = erro.status === 401
          ? 'Usuário ou senha incorretos!'
          : 'Não foi possível conectar ao servidor!';
      }
    });
  }

}
