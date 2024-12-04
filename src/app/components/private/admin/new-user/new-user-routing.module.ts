import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewUserComponent } from "./new-user.component";
import { NewAdminComponent } from "./new-admin/new-admin.component";
import { NewTechnicianComponent } from "./new-technician/new-technician.component";
import { NewAnalystComponent } from "./new-analyst/new-analyst.component";
import { NewMaintenanceComponent } from "./new-maintenance/new-maintenance.component";


const routes: Routes = [
    { 
      path: '', 
      component: NewUserComponent,
      
      children:[
        {
          path:'novo-admin',
          component:NewAdminComponent
        },
        {
          path:'novo-tecnico',
          component:NewTechnicianComponent
        },
        {
          path:'novo-analista',
          component:NewAnalystComponent
        },
        {
          path:'novo-manutencao',
          component:NewMaintenanceComponent
        },  
        {
            path:'**',
            redirectTo:'novo-admin' 
        }
      ]
    
    }
  
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class NewUserRoutingModule {}