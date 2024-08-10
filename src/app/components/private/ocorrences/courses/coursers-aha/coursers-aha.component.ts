import { Component, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';
import { cursesData } from '../../../../../data/cursesData';
import { CoursesDialogComponent } from '../courses-dialog/courses-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-coursers-aha',
  templateUrl: './coursers-aha.component.html',
  styleUrl: './coursers-aha.component.scss'
})
export class CoursersAhaComponent implements OnInit{

  courses = ocorranceData.courseTypes;
  //  courses = cursesData;

  constructor(
    private matDialog: MatDialog,
  ){}


  ngOnInit(): void {
    
  }


  openCursesDialog(curse:any){

    let dialogRef = this.matDialog.open(CoursesDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        curse:curse
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })


  }



}
