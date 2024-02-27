import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrl: './tab-menu.component.scss'
})
export class TabMenuComponent implements OnInit{

  @Input() aName ='';
  @Input() bName ='';
  @Input() cName ='';


  ngOnInit(): void {
    
  }

}
