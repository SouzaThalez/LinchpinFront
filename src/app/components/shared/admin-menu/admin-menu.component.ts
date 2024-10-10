import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss'
})
export class AdminMenuComponent implements OnInit{


  @Input() alink = '';
  @Input() blink = '';
  @Input() clink = '';
  @Input() pageType = '';


  ngOnInit(): void {
    
  }

}
