import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcorrencesComponent } from './ocorrences.component';
import { LowOcorranceComponent } from './low-ocorrance/low-ocorrance.component';
import { MediumOcorranceComponent } from './medium-ocorrance/medium-ocorrance.component';
import { HighOcorranceComponent } from './high-ocorrance/high-ocorrance.component';

const routes: Routes = [
  { 
    path: '', 
    component: OcorrencesComponent,
    children:[
      {
        path:'Habilidade',
        component:LowOcorranceComponent,
        children:[
          {
            path:'treinamentos',
            component:LowOcorranceComponent
          },
        ]
      },
      {
        path:'m-Fidelidade',
        component:MediumOcorranceComponent
      },
      {
        path:'a-Fidelidade',
        component:HighOcorranceComponent
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
export class OcorrencesRoutingModule { }
