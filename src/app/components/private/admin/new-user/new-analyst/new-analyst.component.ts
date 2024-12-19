import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../../enums/userRoles';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../../models/user';
import { userDefaultImagesType } from '../../../../../enums/userDefaultImages';
import { doc, setDoc } from 'firebase/firestore';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';

@Component({
  selector: 'app-new-analyst',
  templateUrl: './new-analyst.component.html',
  styleUrl: './new-analyst.component.scss'
})
export class NewAnalystComponent implements OnInit{


  analystUsers: any;
  userRole = userRoleType.analyst;
  userImage = userDefaultImagesType.defaultAnalystImage;

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private initFirebaseService: InitiateFirebaseService
  ){}

  ngOnInit(): void {
    this.getAnalystUsers();
  }

  openAddNewUserDialog(){

    let dialogRef = this.matDialog.open(AddNewUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
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
      
      //if result false, dialog coming from remove. Update users!
      if(result){

        if(result == 'remove'){
          this.getAnalystUsers();
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
        
        this.snackBar.open('Usuário cadastrado com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });

        this.addUserDocument(sample);
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

          this.snackBar.open('Usuário atualizado com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });

          this.getAnalystUsers();
        },
        error: (erro)=>{console.log('request Users  is NOT good: ',erro);}
    })
  }


  async addUserDocument(docData: any): Promise<boolean> {
  
       const documentId = `analista-${docData.id}`;
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
