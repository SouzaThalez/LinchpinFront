import { Component, OnInit, signal } from '@angular/core';
import { UserLogedService } from '../../../../service/user-loged.service';
import { User } from '../../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../data/snackBarData';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit{
  
  hide = signal(true);
  isShowing = signal(true);

  currentUser: User;
  userForm: FormGroup;
  userPasswordForm : FormGroup;

  constructor(
    private userLogedService : UserLogedService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
  ){}


  ngOnInit(): void {

    this.userForm = this.createUserForm();
    this.userPasswordForm =  this.createPasswordForm();


    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
        this.userForm.patchValue(this.currentUser);  
      }
    });


  }

  submitUserForm(){   

    if(this.userForm.invalid){

      this.snackBar.open('Favor preencher todos os Campos!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      
      return
    }
   
    this.currentUser.name = this.userForm.get('name').value;
    this.currentUser.login = this.userForm.get('login').value;
    this.currentUser.email = this.userForm.get('email').value;
    
    //UpdateUser replaces the entire object of the selected id. So i'm passing the currentUser
    let model = this.currentUser;
    this.updateUser(model);

  }

  submitPasswordForm(){


  
  this.userPasswordForm.patchValue({
    id: this.currentUser.id
  })


    if(this.userPasswordForm.invalid){

      this.snackBar.open('Favor preencher os dois campos!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      
      return
    }
    
    let newPassword = this.userPasswordForm.get('password').value;
    let confirmPassword = this.userPasswordForm.get('confirmPassword').value;

    if(newPassword != confirmPassword){
      
      this.snackBar.open('As senhas precisam ser iguais!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
    }else{

      this.snackBar.open('Senhas iguais!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      
      //Populating userModel after password change
      let model = this.userForm.value;
      model.password = newPassword;
      model.image = this.currentUser.image;
      model.role = this.currentUser.role;

      this.updateUser(model);


    }

  }

  clickEventOne(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clickEvent(event: MouseEvent) {
    this.isShowing.set(!this.isShowing());
    event.stopPropagation();
  }
  

  private createUserForm(){

    const form = this.fb.group({
      name:[null,Validators.required],
      login:[null,Validators.required],
      email:[null,Validators.required],
      id:[] // ID property necessary only for sending updatedUser form to usersDB.
      // password: [null,Validators.required],
      // confirmPassword:[null],
      // image:[],
      // role:[],
      // id:[]
    })

    return form;
    
  }

  private createPasswordForm(){

    const form = this.fb.group({
      id:[],
      password: [null,Validators.required],
      confirmPassword:[null, Validators.required],
    })

    return form;
    
  }

  private updateUser(model:any){
  
    //Model id property is coming from patchValue form
    this.httpClient.put('http://localhost:3000/Users/' + model.id, model)
    .subscribe({
        next: (sample: any)=>{

          this.snackBar.open('Usuário atualizado com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });

          this.ngOnInit();
          
        },
        error: (erro)=>{console.log('request Users  is NOT good: ',erro);}
    })
  }

}
