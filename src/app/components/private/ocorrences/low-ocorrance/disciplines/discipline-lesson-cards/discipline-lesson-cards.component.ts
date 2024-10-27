import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ocorranceData } from '../../../../../../data/ocorranceData';
import { OcorranceDialogComponent } from '../../ocorrance-dialog/ocorrance-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-discipline-lesson-cards',
  templateUrl: './discipline-lesson-cards.component.html',
  styleUrl: './discipline-lesson-cards.component.scss'
})
export class DisciplineLessonCardsComponent implements OnInit{


  routeIndex: string;
  disciplines: any;

  constructor(
    private activeRoute:ActivatedRoute,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
  ){}
  
  ngOnInit(): void {

    this.activeRoute.params.subscribe(value =>{
      this.routeIndex = value['index'];
      this.getDisciplineLessons(this.routeIndex);
  
   })
  
  }


  openOcorranceDialog(lesson: any){
  
    let dialogRef = this.matDialog.open(OcorranceDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        lesson:lesson,
        lessonType: this.disciplines[0].value
      
      }
    })
    //disciplines
    dialogRef.afterClosed().subscribe(result=>{
      
      if(result){
        this.postLessonReports(result);
      }
    })
  }

  
  private postLessonReports(model:any){

    this.httpClient.post('http://localhost:3000/LessonReports',model)
    .subscribe({
        next: (sample: any)=>{
          console.log('request to prepared class  ok!: ',sample);
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
   }

   private getDisciplineLessons(id: string){

    let params = new HttpParams()
    .set('id', id);
    
    this.httpClient.get('http://localhost:3000/Disciplines',{params}).subscribe({
      next:(sample:any)=>{
        this.disciplines = sample;
      },
      error: (erro)=>{console.log('request to Disciplines  failed: ',erro);}
    })

  }


}
