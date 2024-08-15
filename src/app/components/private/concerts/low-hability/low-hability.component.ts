import { Component, OnInit } from '@angular/core';
import { simulatorTypes } from '../../../../data/simulatorTypes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-low-hability',
  templateUrl: './low-hability.component.html',
  styleUrl: './low-hability.component.scss'
})
export class LowHabilityComponent implements OnInit{


  simTypes = simulatorTypes;
  routerName = '';

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.routerName = this.router.snapshot.url[0].path;
    console.log(this.routerName)
    
  }

}
