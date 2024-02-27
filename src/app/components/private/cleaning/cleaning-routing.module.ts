import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleaningComponent } from './cleaning.component';

const routes: Routes = [
  { 
    path: '', 
    component: CleaningComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleaningRoutingModule { }
