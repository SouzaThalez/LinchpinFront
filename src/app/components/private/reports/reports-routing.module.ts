import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { HabilityComponent } from './hability/hability.component';


const routes: Routes = [
    { 
        path: '', 
        component: ReportsComponent,
        children:[
          {
            path:'Habilidade',
            component:HabilityComponent,
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
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
