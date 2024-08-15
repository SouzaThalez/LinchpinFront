import { Component, OnInit } from '@angular/core';
import { simulatorTypes } from '../../../../data/simulatorTypes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medium-hability',
  templateUrl: './medium-hability.component.html',
  styleUrl: './medium-hability.component.scss'
})
export class MediumHabilityComponent implements OnInit{

  routerName = '';

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.routerName = this.router.snapshot.url[0].path;
   
  }

}
