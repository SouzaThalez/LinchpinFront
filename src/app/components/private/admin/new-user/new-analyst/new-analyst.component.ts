import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../../enums/userRoles';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { User } from '../../../../../models/user';
import { userDefaultImagesType } from '../../../../../enums/userDefaultImages';
import { UserApiService } from '../../../../../service/user-api.service';

@Component({
  selector: 'app-new-analyst',
  templateUrl: './new-analyst.component.html',
  styleUrl: './new-analyst.component.scss'
})
export class NewAnalystComponent implements OnInit{

  localAnalystUsers: User[] = [];

  isLoading = false;
  userRole = userRoleType.analyst;
  userImage = userDefaultImagesType.defaultAnalystImage;

  constructor(
    private matDialog: MatDialog,
    private snackBar:MatSnackBar,
    private userApiService: UserApiService
  ){}

  ngOnInit(): void {
    this.getUsers();
  }


  openAddNewUserDialog(){

    let dialogRef = this.matDialog.open(AddNewUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        role: this.userRole,
        image:this.userImage,
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.createUser(result);
      }
    })


  }

  openEditUserDialog(user: User){

    let dialogRef = this.matDialog.open(EditUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        user: user
      }
    })

    dialogRef.afterClosed().subscribe(result=>{

      //if result is a model , update only
      //If result is 'remove', the dialog already removed the user.
      if(result){

        if(result == 'remove'){

          this.getUsers();
          this.openSnackBar('Usuário removido com sucesso!');
          return
        }

        this.updateUser(result);
      }

    })


  }

  private getUsers(){

    this.isLoading = true;

    this.userApiService.list(this.userRole).subscribe({
      next:(users)=>{
        this.localAnalystUsers = users;
        this.isLoading = false;
      },
      error: (erro)=>{
        this.isLoading = false;
        console.log('request to Users failed: ',erro);
      }
    })

  }

  private createUser(model: any){

    this.userApiService.create(model).subscribe({
      next: ()=>{
        this.openSnackBar('Usuário adicionado com sucesso!');
        this.getUsers();
      },
      error: (erro: HttpErrorResponse)=>{
        this.openSnackBar(erro.error?.title ?? 'ERRO ao adicionar o usuário!');
      }
    })
  }

  private updateUser(model: any){

    this.userApiService.update(model.id, model).subscribe({
      next: ()=>{
        this.openSnackBar('Usuário atualizado com sucesso!');
        this.getUsers();
      },
      error: (erro: HttpErrorResponse)=>{
        this.openSnackBar(erro.error?.title ?? 'ERRO em atualização do usuário!');
      }
    })
  }

  private openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      horizontalPosition: snackBarConfig.horizontalPosition,
      verticalPosition: snackBarConfig.verticalPosition,
      duration: snackBarConfig.durationInSeconds * 1000
    });
  }

}
