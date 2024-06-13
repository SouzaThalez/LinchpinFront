import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hability',
  templateUrl: './hability.component.html',
  styleUrl: './hability.component.scss'
})
export class HabilityComponent implements OnInit{
  routerName = '';

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
   
    this.routerName = this.router.snapshot.url[0].path;
    //console.log(this.router.snapshot.url[0].path)
    
  }
}
