import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-low-ocorrance',
  templateUrl: './low-ocorrance.component.html',
  styleUrl: './low-ocorrance.component.scss'
})

export class LowOcorranceComponent implements OnInit{

  routerName = '';

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.routerName = this.router.snapshot.url[0].path;
    
  }

}
