import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { UserLogedService } from '../../../service/user-loged.service';
import { User } from '../../../models/user';
import { UserFirebaseService } from '../../../service/user-firebase.service';
Chart.register(...registerables);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
  ];
  
  currentUser: User;
  userModel = {
    name: '',
    role: '',
    image: '',
    email:''
  }

  constructor(
    private userLogedService : UserLogedService,
    private userFireBaseService : UserFirebaseService
  ){}

  ngOnInit(): void {

    this.userLogedService.getCurrentUser()
    .subscribe({
      next: (user) => {
        this.currentUser = user;
        this.userModel.name = this.currentUser.name;
        this.userModel.role = this.currentUser.role;
        this.userModel.image = this.currentUser.image;
        this.userModel.email = this.currentUser.email;
      }
    });


  }

  postUsersFirebase(){
    this.userFireBaseService.populateUsers();
  }



}
