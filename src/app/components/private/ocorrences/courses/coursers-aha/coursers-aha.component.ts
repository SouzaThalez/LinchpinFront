import { Component, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';
import { cursesData } from '../../../../../data/cursesData';
import { CoursesDialogComponent } from '../courses-dialog/courses-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coursers-aha',
  templateUrl: './coursers-aha.component.html',
  styleUrl: './coursers-aha.component.scss'
})
export class CoursersAhaComponent implements OnInit{

  courses : any;
 

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient,
  ){}


  ngOnInit(): void {
    this.getCurses();
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
        this.postLessonReports(result);
      }
    })


  }

  private postLessonReports(model:any){

    this.httpClient.post('http://localhost:3000/LessonReports',model)
    .subscribe({
        next: (sample: any)=>{
          
        },
        error: (erro)=>{console.log('request to prepared class  is NOT good: ',erro);}
    })
  }

  private getCurses(){

    this.httpClient.get('http://localhost:3000/Curses').subscribe({
      next:(sample:any)=>{
        this.courses = sample;
       
      },
      error: (erro)=>{console.log('request to Curses failed: ',erro);}
    })

  }

}
