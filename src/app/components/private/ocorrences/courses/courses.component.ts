import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  routerName = '';

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.routerName = this.router.snapshot.url[0].path;
    //console.log(this.router.snapshot.url[0].path)
    
  }
}
