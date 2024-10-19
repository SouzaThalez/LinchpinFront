import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { NewSimulatorComponent } from "./new-simulator/new-simulator.component";

const routes: Routes = [
    { 
      path: '', 
      component: AdminComponent,
      children:[
        {
          path:'novo-simulador',
          component:NewSimulatorComponent
        },
        {
            path:'**',
            redirectTo:'novo-simulador' 
        }
      ]
    
    },
  
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdminRoutingModule {}