import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { UserLogedService } from '../../../service/user-loged.service';
import { User } from '../../../models/user';
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
    // this.callChart();
    // this.cleaningChart();
  }



   //Graphics
   private callChart(){
    
    const ctx = document.getElementById('manitanceChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: '',
          data: [12, 19, 3, 5, 2, 3],
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
           legend: {
              display: false
            }
        }
      }
    });

    

   }

   private cleaningChart(){
    
    const ctx = document.getElementById('cleaningChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.months,
        datasets: [{
          label: '',
          data: [12, 19, 3, 5, 2, 3],
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
           legend: {
              display: false
            }
        }
      }
    });

    

   }



}
