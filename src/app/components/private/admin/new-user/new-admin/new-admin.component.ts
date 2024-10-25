import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../enums/userRoles';



@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrl: './new-admin.component.scss'
})
export class NewAdminComponent implements OnInit{

  adminUsers: any;
  userRole = userRoleType.admin;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getAdminUsers();
  }


  openAddNewUserDialog(){

    let dialogRef = this.matDialog.open(AddNewUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'660px',
      data:{
        role: this.userRole
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
      
        let model = result;
        this.postUser(model);
       
      }
    })


  }


  private getAdminUsers(){

    let params = new HttpParams()
    .set('role', 'administrador');

    this.httpClient.get('http://localhost:3000/Users',{params}).subscribe({
      next:(sample: any)=>{
        this.adminUsers = sample;
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }

  private postUser(model:any){

    this.httpClient.post('http://localhost:3000/Users/',model).subscribe({
      next:(sample: any)=>{
        this.getAdminUsers();
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }

}
