import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileCleaningComponent } from './profile-cleaning/profile-cleaning.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileLessonsComponent } from './profile-lessons/profile-lessons.component';

const routes: Routes = [
  {
    path:'',
    component:ProfileComponent,
    children:[
      {
        path:'profile-edit',
        component: EditProfileComponent
      },
      {
        path:'profile-cleaning',
        component: ProfileCleaningComponent
      },
      {
        path:'profile-lessons',
        component: ProfileLessonsComponent
      },
      {
        path:'**',
        redirectTo:'profile-edit'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
