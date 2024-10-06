import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PreviewCleaningReportDialogComponent } from './preview-cleaning-report-dialog/preview-cleaning-report-dialog.component';
import { PreviewLessonReportDialogComponent } from './preview-lesson-report-dialog/preview-lesson-report-dialog.component';
import { PreviewSimulatorReportDialogComponent } from './preview-simulator-report-dialog/preview-simulator-report-dialog.component';
import { InterventionReportDialogComponent } from './intervention-report-dialog/intervention-report-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { PreviewScenarioReportDialogComponent } from './preview-scenario-report-dialog/preview-scenario-report-dialog.component';
import { PreviewManitanceReportDialogComponent } from './preview-manitance-report-dialog/preview-manitance-report-dialog.component';


@NgModule({
  declarations: [
    AlertDialogComponent,
    PreviewCleaningReportDialogComponent,
    PreviewLessonReportDialogComponent,
    PreviewSimulatorReportDialogComponent,
    InterventionReportDialogComponent,
    DetailsDialogComponent,
    PreviewScenarioReportDialogComponent,
    PreviewManitanceReportDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  exports: [
    AlertDialogComponent,
    PreviewCleaningReportDialogComponent,
    PreviewLessonReportDialogComponent,
    InterventionReportDialogComponent

  ],
})
export class SharedModule { }
