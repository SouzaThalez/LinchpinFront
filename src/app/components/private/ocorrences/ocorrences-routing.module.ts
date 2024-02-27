import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcorrencesComponent } from './ocorrences.component';

const routes: Routes = [
  { 
    path: '', 
    component: OcorrencesComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcorrencesRoutingModule { }
