import { Component, OnInit } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-medium-cleaning-dialog',
  templateUrl: './medium-cleaning-dialog.component.html',
  styleUrl: './medium-cleaning-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class MediumCleaningDialogComponent implements OnInit{

  checked = false;
  textMsg = 'mensagwem'

  ngOnInit(): void {

   
  }

  checkBox(value: any){

  }

}
