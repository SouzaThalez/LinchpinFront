import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../../enums/userRoles';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { User } from '../../../../../models/user';
import { userDefaultImagesType } from '../../../../../enums/userDefaultImages';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';
import { DocumentModel } from '../../../../../models/interface/documentModel';
import { HttpClient, HttpParams } from '@angular/common/http';




@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrl: './new-admin.component.scss'
})
export class NewAdminComponent implements OnInit{

  adminUsers: DocumentModel[] = [];

  localAdminUsers: User[] = [] ;

  isLoading = false; 
  userAdminRole = userRoleType.admin; 
  userImage = userDefaultImagesType.defaultAdminImage;

  constructor(
    private matDialog: MatDialog,
    private snackBar:MatSnackBar,
    private initFirebaseService: InitiateFirebaseService,
    private httpClient: HttpClient
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
        role: this.userAdminRole,
        image:this.userImage,
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){

        let model = result;
        this.postFireBaseAdminUser(model);
       
      }
    })


  }

  openEditUserDialog(user: User){
  
    let dialogRef = this.matDialog.open(EditUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        user: user,
        documentId: user
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
    
      //if result is a model , update only
      //If result is 'remove'. Than remove.
      if(result){

        if(result == 'remove'){

          this.getFireBaseAdmins();
          this.snackBar.open('Usuário removido com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });

          return
        }
        
        let model = result;
        let docIdUpdated =`${model.role}-${model.id}`;
        
        this.updateFireBaseAdminUser(model,docIdUpdated);
      }
      
    })


  }

  //FireBase Request
  
  async updateFireBaseAdminUser(docModel: any, docIdRef: string): Promise<any> {
    
    try {

      const docRef = doc(this.initFirebaseService.getDb(), "Users", docIdRef);

      await updateDoc(docRef, docModel);
      this.adminUsers = [];
      this.getFireBaseAdmins();
      
      return this.snackBar.open('Usuário atualizado com sucesso!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      
      

    } catch (error) {
  
      return this.snackBar.open('ERRO em atualização do usuário!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });
      
    }
  }

  async postFireBaseAdminUser(docData: any): Promise<any> {

     const documentId = `${this.userAdminRole}-${docData.id}`;

    try {
      await setDoc(doc(this.initFirebaseService.getDb(), "Users",documentId), docData);

      this.snackBar.open('Usuário adicionado com sucesso!', 'Close', {
        horizontalPosition: snackBarConfig.horizontalPosition,
        verticalPosition: snackBarConfig.verticalPosition,
        duration: snackBarConfig.durationInSeconds * 1000 
      });

      this.getFireBaseAdmins();
     
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }

  async getFireBaseAdmins():Promise<void> {

    this.isLoading = true;
    this.adminUsers = [];

    const q = query(collection(this.initFirebaseService.getDb(), "Users"), where("role", "==", this.userAdminRole));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
     
      const documentData = doc.data() as User; 
      const docID = doc.id;
      this.adminUsers.push({ docID: docID, documentData });
  

    });

    this.isLoading = false;
    console.log('Admins> ',this.adminUsers)



  }


  //Local Request
  
  private getAdminUsers(){
    let params = new HttpParams()
    .set('role', 'administrador');

    this.httpClient.get('http://localhost:3000/Users',{params}).subscribe({
      next:(sample:any)=>{
        this.localAdminUsers = sample;
        console.log(this.localAdminUsers)
      },
      error: (erro)=>{console.log('request to Trainings  failed: ',erro);}
    })

  }


  

}
