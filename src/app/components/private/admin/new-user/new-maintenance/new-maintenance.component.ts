import { Component, OnInit } from '@angular/core';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userRoleType } from '../../../../../enums/userRoles';
import { User } from '../../../../../models/user';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';

@Component({
  selector: 'app-new-maintenance',
  templateUrl: './new-maintenance.component.html',
  styleUrl: './new-maintenance.component.scss'
})
export class NewMaintenanceComponent implements OnInit{


  manitenceUsers: any;
  userRole = userRoleType.maintenance; 
  userImage = 'assets/images/users/user-default-admin.png';

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar:MatSnackBar,
  ){}

  ngOnInit(): void {
    this.getMainitenceUsers();
  }


  openEditUserDialog(user: User){
  
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
          this.getMainitenceUsers();
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

        let model = result;
        this.postUser(model);
       
      }
    })


  }

  private getMainitenceUsers(){

    let params = new HttpParams()
    .set('role', 'manutencao');

    this.httpClient.get('http://localhost:3000/Users',{params}).subscribe({
      next:(sample: any)=>{
        this.manitenceUsers = sample;
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

        this.getMainitenceUsers();
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

          this.getMainitenceUsers();
        },
        error: (erro)=>{console.log('request Users  is NOT good: ',erro);}
    })
  }


}
