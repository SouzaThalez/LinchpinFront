import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-high-hability',
  templateUrl: './high-hability.component.html',
  styleUrl: './high-hability.component.scss'
})
export class HighHabilityComponent implements OnInit{
  

  routerName = '';

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.routerName = this.router.snapshot.url[0].path;
   
  }

}
