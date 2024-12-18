import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLessonComponent } from './new-lesson.component';
import { NewLessonRoutingModule } from './new-lesson-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TrainingsComponent } from './trainings/trainings.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { CursesComponent } from './curses/curses.component';
import { NewTrainingDialogComponent } from './trainings/new-training-dialog/new-training-dialog.component';

import { NewLessonDialogComponent } from './new-lesson-dialog/new-lesson-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EditLessonDialogComponent } from './edit-lesson-dialog/edit-lesson-dialog.component';
import { NewCourseDialogComponent } from './curses/new-course-dialog/new-course-dialog.component';
import { NewDisciplineDialogComponent } from './disciplines/new-discipline-dialog/new-discipline-dialog.component';
import { RemoveLessonDialogComponent } from './remove-lesson-dialog/remove-lesson-dialog.component';
import { ConfirmRemoveComponent } from './confirm-remove/confirm-remove.component';
import { MY_DATE_FORMATS } from '../../../../data/dateformat';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';




@NgModule({
  declarations: [
    NewLessonComponent,
    TrainingsComponent,
    DisciplinesComponent,
    CursesComponent,
    NewTrainingDialogComponent,
    NewLessonDialogComponent,
    EditLessonDialogComponent,
    NewCourseDialogComponent,
    NewDisciplineDialogComponent,
    RemoveLessonDialogComponent,
    ConfirmRemoveComponent
  ],
  imports: [
    CommonModule,
    NewLessonRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],

  providers: [
    provideNgxMask(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class NewLessonModule { }
