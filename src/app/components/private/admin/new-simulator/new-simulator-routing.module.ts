import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewSimulatorComponent } from "./new-simulator.component";
import { LowFidelitySimulatorsComponent } from "./low-fidelity-simulators/low-fidelity-simulators.component";
import { MediumFidelitySimulatorsComponent } from "./medium-fidelity-simulators/medium-fidelity-simulators.component";

const routes: Routes = [
    { 
      path: '', 
      component: NewSimulatorComponent,
      children:[
        {
            path:'galeria-baixa',
            component:LowFidelitySimulatorsComponent
        },
        {
          path:'galeria-media',
          component:MediumFidelitySimulatorsComponent
      },
        {
            path:'**',
            redirectTo:'galeria-baixa' 
        }
      ]
    
    },
  
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class NewSimulatorRoutingModule {}