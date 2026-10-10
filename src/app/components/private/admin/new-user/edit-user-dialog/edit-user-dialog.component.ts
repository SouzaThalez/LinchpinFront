import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { userRolesData } from '../../../../../data/userRolesData';
import { RemoveUserDialogComponent } from '../remove-user-dialog/remove-user-dialog.component';
import { User } from '../../../../../models/user';
import { userDefaultImagesType } from '../../../../../enums/userDefaultImages';
import { userTaskData } from '../../../../../data/userTaskData';
import { userRoleType } from '../../../../../enums/userRoles';
import { UserApiService } from '../../../../../service/user-api.service';

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
    private snackBar:MatSnackBar,
    private matDialog: MatDialog,
    private userApiService: UserApiService,
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
        this.removeUser();
      }
    })
  }

  //A troca de perfil só muda a imagem padrão aqui. O novo perfil é salvo no backend ao confirmar.
  getSelectedRole(role: string){
    this.selectedRole = role;

    switch (this.selectedRole) {
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

  private createForm(){

    const form = this.fb.group({
      name:[null,Validators.required],
      login:[null,Validators.required],
      password: [null], // opcional: em branco mantém a senha atual
      confirmPassword:[null],
      email:[null,Validators.required],
      task:[null,Validators.required],
      image:[],
      role:[],
      id:[]
    })

    return form;

  }

  private removeUser(){

    this.userApiService.remove(this.data.user.id).subscribe({
      next: ()=>{
        this.dialogRef.close('remove');
      },
      error: (erro)=>{
        this.snackBar.open(erro.error?.title ?? 'ERRO ao remover o usuário!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000
        });
      }
    })
  }

}
