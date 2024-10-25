import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../enums/userRoles';

@Component({
  selector: 'app-new-technician',
  templateUrl: './new-technician.component.html',
  styleUrl: './new-technician.component.scss'
})
export class NewTechnicianComponent implements OnInit{


   tecnicalUsers: any;
   userRole = userRoleType.technician;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getTecnicalUsers();
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
debugger
        let model = result;
        this.postUser(model);
       
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
        this.getTecnicalUsers();
      },
      error:(error)=>{
        console.log('Something wrong with the request to highSimulators ',error)
      }
    })
  }
}
