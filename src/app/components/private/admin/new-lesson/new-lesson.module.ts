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
import { provideNgxMask } from 'ngx-mask';
import { NewLessonDialogComponent } from './new-lesson-dialog/new-lesson-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EditLessonDialogComponent } from './edit-lesson-dialog/edit-lesson-dialog.component';
import { NewCourseDialogComponent } from './curses/new-course-dialog/new-course-dialog.component';
import { NewDisciplineDialogComponent } from './disciplines/new-discipline-dialog/new-discipline-dialog.component';
import { RemoveDisciplineDialogComponent } from './disciplines/remove-discipline-dialog/remove-discipline-dialog.component';



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
    RemoveDisciplineDialogComponent
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
    MatDatepickerModule
  ],
  providers: [
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class NewLessonModule { }
