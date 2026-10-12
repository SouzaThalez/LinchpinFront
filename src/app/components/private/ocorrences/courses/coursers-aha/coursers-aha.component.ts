import { Component, OnInit } from '@angular/core';
import { ocorranceData } from '../../../../../data/ocorranceData';
import { cursesData } from '../../../../../data/cursesData';
import { CoursesDialogComponent } from '../courses-dialog/courses-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../../environments/environment';
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
    
    this.matDialog.open(CoursesDialogComponent,{
      disableClose: true,
      width:'650px',
      data:{
        curse:curse
      }
    })


  }

  private getCurses(){

    this.httpClient.get(environment.apiUrl + '/courses').subscribe({
      next:(sample:any)=>{
        this.courses = sample;
       
      },
      error: (erro)=>{console.log('request to Curses failed: ',erro);}
    })

  }

}
