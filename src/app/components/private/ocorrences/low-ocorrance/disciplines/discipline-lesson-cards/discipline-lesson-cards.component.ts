import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ocorranceData } from '../../../../../../data/ocorranceData';
import { OcorranceDialogComponent } from '../../ocorrance-dialog/ocorrance-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-discipline-lesson-cards',
  templateUrl: './discipline-lesson-cards.component.html',
  styleUrl: './discipline-lesson-cards.component.scss'
})
export class DisciplineLessonCardsComponent implements OnInit{


  routeIndex:any;
  disciplines = ocorranceData.disciplineTypes;
  discipline: any;

  constructor(
    private activeRoute:ActivatedRoute,
    private matDialog: MatDialog,
  ){}
  
  ngOnInit(): void {

    this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      this.discipline = this.disciplines[this.routeIndex];
      console.log(this.discipline)
  
   })
  
  }


  openOcorranceDialog(lesson: any){

    let dialogRef = this.matDialog.open(OcorranceDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        lesson:lesson
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        
      }
    })
  }



}
