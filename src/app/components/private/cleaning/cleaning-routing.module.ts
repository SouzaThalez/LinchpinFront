import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleaningComponent } from './cleaning.component';
import { LowFidelityComponent } from './low-fidelity/low-fidelity.component';
import { MediumFidelityComponent } from './medium-fidelity/medium-fidelity.component';
import { HighFidelityComponent } from './high-fidelity/high-fidelity.component';
import { LowFidelityDetailsComponent } from './low-fidelity/low-fidelity-details/low-fidelity-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: CleaningComponent,
    children:[
      {
        path:'Habilidade',
        component:LowFidelityComponent
      },
      {
        path:'Habilidade/:index',
        component:LowFidelityDetailsComponent
      },
      {
        path:'media-Fidelidade',
        component:MediumFidelityComponent
      },
      {
        path:'alta-Fidelidade',
        component:HighFidelityComponent
      },
      {
        path:'**',
        redirectTo:'Habilidade'
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleaningRoutingModule { }
