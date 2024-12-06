import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileCleaningComponent } from './profile-cleaning/profile-cleaning.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileLessonsComponent } from './profile-lessons/profile-lessons.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCleaningComponent,
    EditProfileComponent,
    ProfileLessonsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
