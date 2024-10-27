import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { User } from '../../../../models/user';
import { userRolesData } from '../../../../../data/userRolesData';
import { RemoveUserDialogComponent } from '../remove-user-dialog/remove-user-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent implements OnInit{


  form:FormGroup;
  userRoles = userRolesData;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private httpClient: HttpClient,
    private snackBar:MatSnackBar,
    private matDialog: MatDialog,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      user:User
    },
  ){}



  ngOnInit(): void {
    this.form = this.createForm();
    this.form.patchValue(this.data.user);

  }

  openRemoveUserDialog(){

    let dialogRef = this.matDialog.open(RemoveUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'226px',
      data:{
        user:this.data.user
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
   
        let model = result;
        this.removeUser(model);
   
       
      }
    })
  }


  private removeUser(model:any){

    this.httpClient.delete('http://localhost:3000/Users/' + model.id)
    .subscribe({
        next: (sample: any)=>{
          this.dialogRef.close('remove');
          
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }



  submitForm(){
  
    if(this.form.invalid){

      this.snackBar.open('Favor preencher todos os Campos!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      return
    }

    
    this.dialogRef.close(this.form.value);

  }



  private createForm(){

    const form = this.fb.group({
      name:[null,Validators.required],
      login:[null,Validators.required],
      password: [null,Validators.required],
      confirmPassword:[null],
      email:[null,Validators.required],
      image:[],
      role:[],
      id:[]
    })

    return form;
    
  }

}
