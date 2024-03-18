import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent implements OnInit{
  
  routerName = '';

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.routerName = this.router.snapshot.url[0].path;
    //console.log(this.router.snapshot.url[0].path)
    
  }
}
