import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../enums/userRoles';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-new-analyst',
  templateUrl: './new-analyst.component.html',
  styleUrl: './new-analyst.component.scss'
})
export class NewAnalystComponent implements OnInit{


  analystUsers: any;
  userRole = userRoleType.analyst;
  userImage = 'assets/images/users/user-default-analist.png';

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getAnalystUsers();
  }

  openAddNewUserDialog(){

    let dialogRef = this.matDialog.open(AddNewUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'540px',
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
      height:'540px',
      data:{
        user:user
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let model = result;
        this.updateUser(model);
       
      }
    })
  }

  private getAnalystUsers(){

    let params = new HttpParams()
    .set('role', 'analista');

    this.httpClient.get('http://localhost:3000/Users',{params}).subscribe({
      next:(sample: any)=>{
        this.analystUsers = sample;
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }
  
  private postUser(model:any){

    this.httpClient.post('http://localhost:3000/Users/',model).subscribe({
      next:(sample: any)=>{
        this.getAnalystUsers();
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
          this.getAnalystUsers();
        },
        error: (erro)=>{console.log('request Users  is NOT good: ',erro);}
    })
  }


}
