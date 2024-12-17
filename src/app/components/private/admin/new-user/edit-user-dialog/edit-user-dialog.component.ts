import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { userRolesData } from '../../../../../data/userRolesData';
import { RemoveUserDialogComponent } from '../remove-user-dialog/remove-user-dialog.component';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../../models/user';
import { userDefaultImagesType } from '../../../../../enums/userDefaultImages';
import { userTaskData } from '../../../../../data/userTaskData';
import { userRoleType } from '../../../../../enums/userRoles';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
 
})
export class EditUserDialogComponent implements OnInit{


  form: FormGroup;
  userRoles = userRolesData;
  adminImage = userDefaultImagesType.defaultAdminImage;
  analystImage = userDefaultImagesType.defaultAnalystImage;
  tecnicianImage = userDefaultImagesType.defaultTechnicianImage;
  manitanceImage = userDefaultImagesType.defaultMaintenanceImage; 
  userTask = userTaskData;
  userTecRole = userRoleType.technician;
  selectedRole: string ; 



  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private httpClient: HttpClient,
    private snackBar:MatSnackBar,
    private matDialog: MatDialog,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User
    },
  ){}



  ngOnInit(): void {
  
    this.form = this.createForm();
    this.form.patchValue(this.data.user);
    this.selectedRole = this.data.user.role;
  
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

  getSelectedRole(role: string){
    this.selectedRole = role;
    switch (role) {
      case 'tecnico':
      this.form.patchValue({
        image: this.tecnicianImage
      })
      break;
      case 'analista':
        this.form.patchValue({
          image: this.analystImage
        })
      break;
      case 'administrador':
        this.form.patchValue({
          image: this.adminImage
        })
      break;
      case 'manutencao':
        this.form.patchValue({
          image: this.manitanceImage
        })
      break;
    
      default:
        break;
    }
  }

  submitForm(){
  
    let formRole = this.form.get('role').value;
    let formTask = this.form.get('task').value;

    if(formTask == 'N/A'){
      if(formRole == this.userTecRole){
        this.form.patchValue({
          task: null
        })
      }
    }else{

      if(formRole != this.userTecRole){
        this.form.patchValue({
          task: 'N/A'
        })
      }else{

        this.form.patchValue({
          task: this.form.get('task').value
        })
      }


    
    }
  

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

  private removeUser(model:any){

    this.httpClient.delete('http://localhost:3000/Users/' + model.id)
    .subscribe({
        next: (sample: any)=>{
          this.dialogRef.close('remove');
          
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private createForm(){

    const form = this.fb.group({
      name:[null,Validators.required],
      login:[null,Validators.required],
      password: [null,Validators.required],
      confirmPassword:[null],
      email:[null,Validators.required],
      task:[null,Validators.required],
      image:[],
      role:[],
      id:[]
    })

    return form;
    
  }

}
