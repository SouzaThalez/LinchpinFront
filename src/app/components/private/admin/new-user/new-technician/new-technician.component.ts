import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../enums/userRoles';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { User } from '../../../../models/user';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-technician',
  templateUrl: './new-technician.component.html',
  styleUrl: './new-technician.component.scss'
})
export class NewTechnicianComponent implements OnInit{


   tecnicalUsers: any;
   userRole = userRoleType.technician;
   userImage = 'assets/images/users/user-default-tec.png';

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getTecnicalUsers();
  }

  openAddNewUserDialog(){

    let dialogRef = this.matDialog.open(AddNewUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        role: this.userRole,
        image:this.userImage
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
    
      if(result){
  
        let model = result;
        this.postUser(model);
       
      }
    })


  }

  openEditUserDialog(user:User){

    let dialogRef = this.matDialog.open(EditUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        user:user
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
       //if result is remove. update users
      if(result){

        if(result == 'remove'){
          this.getTecnicalUsers();
          this.snackBar.open('Usuário removido com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
          return
        }

        let model = result;
        this.updateUser(model);
       
      }
    })
  }

  private getTecnicalUsers(){

    let params = new HttpParams()
    .set('role', 'tecnico');

    this.httpClient.get('http://localhost:3000/Users',{params}).subscribe({
      next:(sample: any)=>{
        this.tecnicalUsers = sample;
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }

  private postUser(model:any){

    this.httpClient.post('http://localhost:3000/Users/',model).subscribe({
      next:(sample: any)=>{

        this.snackBar.open('Usuário cadastrado com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });
        this.getTecnicalUsers();
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }

  private updateUser(model:any){

    this.httpClient.put('http://localhost:3000/Users/' + model.id, model)
    .subscribe({
        next: (sample: any)=>{

          this.snackBar.open('Usuário atualizado com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });
          this.getTecnicalUsers();
        },
        error: (erro)=>{console.log('request Users  is NOT good: ',erro);}
    })
  }


}
