import { Component, Inject, OnInit } from '@angular/core';
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
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { InitiateFirebaseService } from '../../../../../service/initiate-firebase.service';

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
    private initFirebaseService: InitiateFirebaseService,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User,
      documentId: string
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
        this.removeFireBaseAdminUser();
   
       
      }
    })
  }

  getSelectedRole(role: string){
    this.selectedRole = role;
    let newDocRefId: string;

    switch (this.selectedRole) {
      case 'tecnico':
      this.form.patchValue({
        image: this.tecnicianImage
      })
 
      newDocRefId =`tecnico-${this.data.user.id}`;
      this.updateDocRole(this.data.documentId,newDocRefId);
      break;
      case 'analista':
        this.form.patchValue({
          image: this.analystImage
        })
        debugger
        newDocRefId =`analista-${this.data.user.id}`;
        this.updateDocRole(this.data.documentId,newDocRefId);
      break;
      case 'administrador':
        this.form.patchValue({
          image: this.adminImage
        })
        debugger
        newDocRefId =`administrador-${this.data.user.id}`;
        this.updateDocRole(this.data.documentId,newDocRefId);
      break;
      case 'manutencao':
        this.form.patchValue({
          image: this.manitanceImage
        })
        newDocRefId =`manutencao-${this.data.user.id}`;
        this.updateDocRole(this.data.documentId,newDocRefId);
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

  async removeFireBaseAdminUser(): Promise<void> {
    debugger
    try {

      const docRef = doc(this.initFirebaseService.getDb(), "Users", this.data.documentId);

      await deleteDoc(docRef);
      //After removal
      this.dialogRef.close('remove');

    } catch (error) {
      
      console.error("Error removing user:", error);
    }
  }

  async updateDocRole(oldDocId, newDocId){

    const db = this.initFirebaseService.getDb();

    const oldDocRef = doc(db,"Users",oldDocId);
    const newDocRef = doc(db,"Users",newDocId);
    try {
      // Fetch the document data from the old ID
      const docSnapshot = await getDoc(oldDocRef);
      if (docSnapshot.exists()) {
        // Copy the document data to the new document ID
        const docData = docSnapshot.data();
        docData['role'] = this.selectedRole;
      
        await setDoc(newDocRef, docData);
  
        // Delete the old document
        await deleteDoc(oldDocRef);
  
        console.log(`Document ID changed from ${oldDocId} to ${newDocId}`);
      } else {
        console.log(`No document found with ID: ${oldDocId}`);
      }
    } catch (error) {
      console.error("Error changing document ID:", error);
    }
  


  }







}
