import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../../enums/userRoles';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { User } from '../../../../../models/user';
import { userDefaultImagesType } from '../../../../../enums/userDefaultImages';
import { doc, setDoc } from 'firebase/firestore';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';



@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrl: './new-admin.component.scss'
})
export class NewAdminComponent implements OnInit{

  adminUsers: any;
  userRole = userRoleType.admin; 
  userImage = userDefaultImagesType.defaultAdminImage;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar:MatSnackBar,
    private initFirebaseService: InitiateFirebaseService
  ){}

  ngOnInit(): void {
    this.getAdminUsers();
  }


  openAddNewUserDialog(){

    let dialogRef = this.matDialog.open(AddNewUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'600px',
      data:{
        role: this.userRole,
        image:this.userImage,
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){

        let model = result;
        debugger
        this.postUser(model);
       
      }
    })


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
        debugger
        if(result == 'remove'){

          this.getAdminUsers();
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

  private postUser(model: User){

    this.httpClient.post('http://localhost:3000/Users/',model).subscribe({
      next:(sample: any)=>{

        this.snackBar.open('Usuário cadastrado com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });
        
        this.addUserDocument(sample);
        this.getAdminUsers();
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
          
          this.getAdminUsers();
        },
        error: (erro)=>{console.log('request Users  is NOT good: ',erro);}
    })
  }


  async addUserDocument(docData: any): Promise<boolean> {

     const documentId = `admin-${docData.id}`;
    try {
      await setDoc(doc(this.initFirebaseService.getDb(), "Users",documentId), docData);
      console.log("Document successfully written!");
      return true; // Indicate success
    } catch (error) {
      console.error("Error writing document: ", error);
      return false; // Indicate failure
    }
  }









}
