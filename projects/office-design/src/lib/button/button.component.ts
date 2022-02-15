import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'od-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input('color') colorType: string | undefined;
  
  constructor() { }

  ngOnInit() {
    
  }

}
