import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavMenuComponent } from './nav-menu.component';

const routes: Routes = [
  { 
    path: '', 
    component: NavMenuComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavMenuRoutingModule { }
