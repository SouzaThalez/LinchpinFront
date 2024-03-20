import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConcertsComponent } from './concerts.component';
import { LowHabilityComponent } from './low-hability/low-hability.component';
import { MediumHabilityComponent } from './medium-hability/medium-hability.component';
import { HighHabilityComponent } from './high-hability/high-hability.component';
import { LowHabilityDetailsComponent } from './low-hability/low-hability-details/low-hability-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: ConcertsComponent,
    children:[
      {
        path:'Baixa-Fidelidade',
        component:LowHabilityComponent
      },
      {
        path:'Baixa-Fidelidade/:index',
        component:LowHabilityDetailsComponent
      },
      {
        path:'Media-Fidelidade',
        component:MediumHabilityComponent
      },
      {
        path:'Alta-Fidelidade',
        component:HighHabilityComponent
      },
      {
        path:'**',
        redirectTo:'Baixa-Fidelidade'
      }
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcertsRoutingModule {}