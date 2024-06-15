import { Component, Input, OnInit, Output, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  
@Input() aTabLink = '';
@Input() bTabLink = '';
@Input() cTabLink = '';
@Input() type = '';

pageTypeName = '';

constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
  //tabmenu
 
  // Get the full path from the window location
  const fullPath = window.location.pathname;

  // Split the path by '/' to get segments
  const segments = fullPath.split('/');

  // Find the index of 'private' in the segments array
  const privateIndex = segments.indexOf('private');

  // If 'private' exists and there's a segment after it
  if (privateIndex !== -1 && privateIndex + 1 < segments.length) {
    // Extract the segment after 'private'
    this.pageTypeName = segments[privateIndex + 1];
  }


  }


    
  

}
