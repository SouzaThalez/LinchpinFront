import { Component, Input, OnInit, Output, input } from '@angular/core';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  
@Input() aName = '';
@Input() bName = '';
@Input() cName = '';
@Input() type = '';
@Input() routerName = '';

  constructor() { }

  ngOnInit(): void {

  }

}
