import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'od-office-design',
  template: `
    <p class="it-works">
      If you see this, it means the library works!
    </p>
  `,
  styles: [
    `
      .it-works{
        margin: 0;
        background-color: red;
        padding: 10px;
        color: white;
        font-size: 15px;
      }
    `
  ]
})
export class OfficeDesignComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
