import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConcertsComponent } from './concerts.component';
import { LowHabilityComponent } from './low-hability/low-hability.component';
import { MediumHabilityComponent } from './medium-hability/medium-hability.component';
import { HighHabilityComponent } from './high-hability/high-hability.component';
import { CleaningRegistersComponent } from './low-hability/cleaning-registers/cleaning-registers.component';
import { OcorranceRegistersComponent } from './low-hability/ocorrance-registers/ocorrance-registers.component';
import { MediumCleaningRegisterComponent } from './medium-hability/medium-cleaning-register/medium-cleaning-register.component';
import { MediumOcorranceRegisterComponent } from './medium-hability/medium-ocorrance-register/medium-ocorrance-register.component';
import { HighCleaningRegisterComponent } from './high-hability/high-cleaning-register/high-cleaning-register.component';
import { HighManitenceRegisterComponent } from './high-hability/high-manitence-register/high-manitence-register.component';

const routes: Routes = [
  { 
    path: '', 
    component: ConcertsComponent,
    children:[
      {
        path:'Baixa-Fidelidade',
        component:LowHabilityComponent,
        children:[
          {
            path:'chamados-limpezas',
            component: CleaningRegistersComponent
          },
          {
            path:'chamados-aulas',
            component: OcorranceRegistersComponent
          },
          {
            path:'**',
            redirectTo:'chamados-limpezas'
          },
        ]
      },
   
      {
        path:'Media-Fidelidade',
        component:MediumHabilityComponent,
        children:[
          {
            path:'chamados-limpezas',
            component: MediumCleaningRegisterComponent
          },
          {
            path:'chamados-aulas',
            component: MediumOcorranceRegisterComponent
          },
          {
            path:'**',
            redirectTo:'chamados-limpezas'
          },
        ]
      },
      {
        path:'Alta-Fidelidade',
        component:HighHabilityComponent,
        children:[
          {
            path:'chamados-limpezas',
            component: HighCleaningRegisterComponent
          },
          {
            path:'chamados-manutencao',
            component: HighManitenceRegisterComponent
          },
          {
            path:'**',
            redirectTo:'chamados-limpezas'
          },
        ]
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