import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewLessonComponent } from "./new-lesson.component";
import { TrainingsComponent } from "./trainings/trainings.component";
import { DisciplinesComponent } from "./disciplines/disciplines.component";
import { CursesComponent } from "./curses/curses.component";


const routes: Routes = [
    { 
      path: '', 
      component: NewLessonComponent,
      
      children:[
        {
            path:'treinamentos',
            component:TrainingsComponent
        },
        {
          path:'disciplinas',
          component:DisciplinesComponent
        },
        {
          path:'cursos',
          component:CursesComponent
        },
        {
            path:'**',
            redirectTo:'treinamentos' 
        }
      ]
    
    }
  
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class NewLessonRoutingModule {}