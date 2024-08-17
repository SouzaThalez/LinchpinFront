import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PreviewReportDialogComponent } from './preview-report-dialog/preview-report-dialog.component';
import { PreviewCleaningReportDialogComponent } from './preview-cleaning-report-dialog/preview-cleaning-report-dialog.component';
import { PreviewLessonReportDialogComponent } from './preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { PreviewSimulatorReportDialogComponent } from './preview-simulator-report-dialog/preview-simulator-report-dialog.component';



@NgModule({
  declarations: [
    AlertDialogComponent,
    PreviewReportDialogComponent,
    PreviewCleaningReportDialogComponent,
    PreviewLessonReportDialogComponent,
    PreviewSimulatorReportDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  exports: [
    AlertDialogComponent,
    PreviewReportDialogComponent,
    PreviewCleaningReportDialogComponent,
    PreviewLessonReportDialogComponent

  ],
})
export class SharedModule { }
