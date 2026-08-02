import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { userRoleType } from '../../../../../enums/userRoles';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { snackBarConfig } from '../../../../../data/snackBarData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../../models/user';
import { userDefaultImagesType } from '../../../../../enums/userDefaultImages';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';
import { DocumentModel } from '../../../../../models/interface/documentModel';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-new-technician',
  templateUrl: './new-technician.component.html',
  styleUrl: './new-technician.component.scss'
})
export class NewTechnicianComponent implements OnInit{

  //  tecnicalUsers: any;
   tecnicalUsers: DocumentModel[] = [];
   localTecnicalUsers: User[] = [] ;

   isLoading = false; 
   userTechRole = userRoleType.technician;
   userImage = userDefaultImagesType.defaultTechnicianImage;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private initFirebaseService: InitiateFirebaseService,
     private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.getLocalTecnicalUsers();
  }

  openAddNewUserDialog(){

    let dialogRef = this.matDialog.open(AddNewUserDialogComponent,{
      disableClose: true,
      width:'468px',
      height:'598px',
      data:{
        role: this.userTechRole,
        image:this.userImage
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
    
      if(result){
  
        let model = result;
        this.postFireBaseTechUser(model);
       
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
       //if result is remove. update users
      if(result){

        if(result == 'remove'){

          this.getFireBaseTechnicians();
          this.snackBar.open('Usuário removido com sucesso!', 'Close', {
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition,
            duration: snackBarConfig.durationInSeconds * 1000 
          });

          return
        }

        let model = result;
        let docIdUpdated =`${model.role}-${model.id}`;
        this.updateFireBaseTechUser(model,docIdUpdated);
       
      }
    })
  }

  //FireBase Request
  async postFireBaseTechUser(docData: any): Promise<any> {
  
      //  const documentId = `tecnico-${docData.id}`;
       const documentId = `${this.userTechRole}-${docData.id}`;
      try {

        await setDoc(doc(this.initFirebaseService.getDb(), "Users",documentId), docData);

        this.snackBar.open('Usuário adicionado com sucesso!', 'Close', {
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition,
          duration: snackBarConfig.durationInSeconds * 1000 
        });

        this.getFireBaseTechnicians();
       
      } catch (error) {
        console.error("Error writing document: ", error);
        
      }
  }

  async getFireBaseTechnicians():Promise<void> {
  
      this.isLoading = true;
      this.tecnicalUsers = [];
  
      const q = query(collection(this.initFirebaseService.getDb(), "Users"), where("role", "==", this.userTechRole));
  
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
       
        const documentData = doc.data() as User; 
        const docID = doc.id;
        this.tecnicalUsers.push({ docID: docID, documentData });

      });
  
      this.isLoading = false;
      console.log('Tecnicos> ',this.tecnicalUsers)
  
  
  
  }
  
  async updateFireBaseTechUser(docModel: any, docIdRef: string): Promise<any> {
      
      try {
  
        const docRef = doc(this.initFirebaseService.getDb(), "Users", docIdRef);
  
        await updateDoc(docRef, docModel);

        //Clear data in DOM before showing new
        this.tecnicalUsers = [];
        this.getFireBaseTechnicians();
        
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

   //Local Request
  private getLocalTecnicalUsers(){
        let params = new HttpParams()
        .set('role', 'tecnico');
    
        this.httpClient.get('http://localhost:3000/Users',{params}).subscribe({
          next:(sample:any)=>{
            this.localTecnicalUsers = sample;
          },
          error: (erro)=>{console.log('request to Trainings  failed: ',erro);}
        })
    
  }

}
