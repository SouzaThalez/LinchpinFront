import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hability-report',
  templateUrl: './hability-report.component.html',
  styleUrl: './hability-report.component.scss'
})
export class HabilityReportComponent implements OnInit{

  routerName = '';

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    //hability-reports
    this.routerName = this.router.snapshot.url[0].path;   
   
  }


}
