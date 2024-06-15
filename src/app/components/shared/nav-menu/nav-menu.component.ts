import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  @Input() alink = '';
  @Input() blink = '';
  @Input() clink = '';
  @Input() pageType = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAlinkClick() {
    // Your logic for alink click
    console.log('Alink clicked');
  }

  onBlinkClick() {
    // Your logic for blink click
    console.log('Blink clicked');
  }

  onClinkClick() {
    // Your logic for clink click
    console.log('Clink clicked');
  }







}
