import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateComponent } from './private.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'cleaning',
        loadChildren: () => import('./cleaning/cleaning.module').then((m) => m.CleaningModule),
      },
      {
        path: 'ocorrences',
        loadChildren: () =>
          import('./ocorrences/ocorrences.module').then((m) => m.OcorrencesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
