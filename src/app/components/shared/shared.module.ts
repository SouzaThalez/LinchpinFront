import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PreviewReportDialogComponent } from './preview-report-dialog/preview-report-dialog.component';



@NgModule({
  declarations: [
    AlertDialogComponent,
    PreviewReportDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  exports: [
    AlertDialogComponent,
    PreviewReportDialogComponent,

  ],
})
export class SharedModule { }
