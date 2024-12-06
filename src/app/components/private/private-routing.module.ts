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
        path: 'profile',
        loadChildren: ()=> import('./profile/profile.module').then((m)=> m.ProfileModule),
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
      {
        path: 'concerts',
        loadChildren: () =>
          import('./concerts/concerts.module').then((m) => m.ConcertsModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'administracao',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path:'**',
        redirectTo:'home'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
