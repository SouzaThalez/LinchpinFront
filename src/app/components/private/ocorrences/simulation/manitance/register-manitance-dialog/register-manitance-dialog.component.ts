import { Component, Inject, OnInit } from '@angular/core';
import { checkBoxesData } from '../../../../../../data/checkBoxesData';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Simulator } from '../../../../../../models/simulator';

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

  preventiveForm:any;
  user = { name:'',role:''};

  constructor(
    public dialogRef: MatDialogRef<RegisterManitanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      simulator: Simulator,
      manitance: string
    },
    public fb : FormBuilder,
  ){}

  ngOnInit(): void {  
      this.form = this.createForm();
  }



  getCheckedElement(element:any){
    element.value = !element.value;
    this.checkedBoxes = this.allcCheckBoxData.prevCheckboxes.filter((element:any) => element.value == true);
    this.preventiveForm.patchValue({procedures:this.checkedBoxes});
  }


  getsecondCheckedElement(element:any){
    element.value = !element.value;
    this.checkedBoxes = this.allcCheckBoxData.secundCheckboxes.filter((element:any) => element.value == true);
    this.preventiveForm.patchValue({procedures:this.checkedBoxes});
  }


  onChangeAllChecked(isChecked:any){
    if(isChecked){
      this.allcCheckBoxData.prevCheckboxes.forEach((element:any)=> element.value = true);
      this.preventiveForm.patchValue({procedures:this.allcCheckBoxData.prevCheckboxes});
    }else{
      this.allcCheckBoxData.prevCheckboxes.forEach((element:any)=> element.value = false);
      this.preventiveForm.patchValue({procedures:[]});
    }
    
  }



  private createForm(): FormGroup{

    const prevForm = this.fb.group({
      date: [null,Validators.required],
      mediumOcorrance: [null, Validators.required],
      manitanceType:['preventiva'],
      reportStatus: ['aberto'],
      simulatorName: [],
      code: [],
      simulatorImage: [],
      noDescription: [false],
      procedures:[[],Validators.required],
      user: this.user
    })

    return prevForm;
  }

}
