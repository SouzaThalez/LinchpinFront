import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogOutDialogComponent } from './log-out-dialog/log-out-dialog.component';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss'
})
export class LeftPanelComponent implements OnInit{




  constructor(
    private route: Router,
    private matDialog: MatDialog,
  ){}


  ngOnInit(): void {
    
  }

  openlogOutDialog(){

    let dialogRef = this.matDialog.open(LogOutDialogComponent,{
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result=>{
      switch (result) {
        case 'yes':
            this.route.navigateByUrl('/login');
          break;
          case 'no':
            
          break;
      }
    })

  }



}
