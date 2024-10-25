import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../enums/userRoles';

@Component({
  selector: 'app-new-analyst',
  templateUrl: './new-analyst.component.html',
  styleUrl: './new-analyst.component.scss'
})
export class NewAnalystComponent implements OnInit{


  analystUsers: any;
  userRole = userRoleType.analyst;

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


}
