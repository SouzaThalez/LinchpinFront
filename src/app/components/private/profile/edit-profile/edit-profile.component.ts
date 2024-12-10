import { Component, OnInit, signal } from '@angular/core';
import { UserLogedService } from '../../../../service/user-loged.service';
import { User } from '../../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../data/snackBarData';

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

  constructor(
    private userLogedService : UserLogedService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ){}


  ngOnInit(): void {

    this.userForm = this.createForm();

    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
        this.userForm.patchValue(this.currentUser);  
      }
    });


  }

  submitForm(){
  
    if(this.userForm.invalid){

      this.snackBar.open('Favor preencher todos os Campos!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      
      return
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
