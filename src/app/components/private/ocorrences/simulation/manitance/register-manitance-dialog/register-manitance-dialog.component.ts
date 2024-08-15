import { Component, Inject, OnInit } from '@angular/core';
import { checkBoxesData } from '../../../../../../data/checkBoxesData';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../../models/simulator';
import moment from 'moment';
import { AlertDialogComponent } from '../../../../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-register-manitance-dialog',
  templateUrl: './register-manitance-dialog.component.html',
  styleUrl: './register-manitance-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class RegisterManitanceDialogComponent implements OnInit{

  allcCheckBoxData = checkBoxesData;

  form: FormGroup;
  checkedBoxes:any[]=[];
  defaultMessage = 'Não houve registro de achados durante a manutenção';
  user = { name:'',role:''};

  constructor(
    public dialogRef: MatDialogRef<RegisterManitanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: Simulator,
      manitance: string
    },
    public fb : FormBuilder,
    private matDialog: MatDialog,
  ){}

  ngOnInit(): void {  
      this.form = this.createForm();
  }


  onSubmit(){
   
    if(this.form.value.noDescription){
      this.form.patchValue({manitanceFindings:this.defaultMessage});
    }  

   
    if (this.form.valid) {

      let momentDate = moment(this.form.value.date).format('DD-MM-YYYY');
      this.form.patchValue({date: momentDate});

      const model = this.form.value;
      this.onClose(model);
      return
    }
    
    this.openAlertDialog();
  }

  onClose(value: any): void {
    this.dialogRef.close(value);
  }

  getCheckedElement(element:any){
    element.value = !element.value;
    this.checkedBoxes = this.allcCheckBoxData.prevCheckboxes.filter((element:any) => element.value == true);
    this.form.patchValue({manitanceRegister:this.checkedBoxes});
  }


  getsecondCheckedElement(element:any){
    element.value = !element.value;
    this.checkedBoxes = this.allcCheckBoxData.secundCheckboxes.filter((element:any) => element.value == true);
    this.form.patchValue({manitanceRegister:this.checkedBoxes});
  }


  onChangeAllChecked(isChecked:any){
 
    if(isChecked){
      this.allcCheckBoxData.prevCheckboxes.forEach((element:any)=> element.value = true);
      this.form.patchValue({manitanceRegister:this.allcCheckBoxData.prevCheckboxes});
    }else{
      this.allcCheckBoxData.prevCheckboxes.forEach((element:any)=> element.value = false);
      this.form.patchValue({manitanceRegister:[]});
    }
    
  }

  private openAlertDialog(){

    let dialogRef = this.matDialog.open(AlertDialogComponent,{
      disableClose: true,
      width:'468px',
  
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }

  private createForm(): FormGroup{

    const prevForm = this.fb.group({
      date: [null,Validators.required],
      manitanceRegister: [null, Validators.required],
      manitanceCategory:[this.data.manitance],
      manitanceFindings: [null, Validators.required],
      simulatorName: [this.data.simulator.name],  
      code: [this.data.simulator.codes[0]],
      simulatorImage: [this.data.simulator.image],
      noDescription: [false],
      user: this.user
    })

    return prevForm;
  }

}
