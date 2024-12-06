import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileCleaningComponent } from './profile-cleaning/profile-cleaning.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileLessonsComponent } from './profile-lessons/profile-lessons.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCleaningComponent,
    EditProfileComponent,
    ProfileLessonsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
    
  ]
})
export class ProfileModule { }
