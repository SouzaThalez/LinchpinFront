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



@NgModule({
  declarations: [
    NewLessonComponent,
    TrainingsComponent,
    DisciplinesComponent,
    CursesComponent,
    NewTrainingDialogComponent,
    NewLessonDialogComponent
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
