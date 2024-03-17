import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'private',
    loadChildren: () =>
      import('./components/private/private.module').then((module) => module.PrivateModule),
  },
  {
    path: '',
    loadChildren: () => import('./components/public/public.module').then((m) => m.PublicModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
