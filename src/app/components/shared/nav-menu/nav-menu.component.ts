import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit{
  
  @Input() alink ='';
  @Input() blink ='';
  @Input() clink ='';
  
  ngOnInit(): void {
    
  }

}
