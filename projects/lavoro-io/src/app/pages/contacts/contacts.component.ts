import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'io-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  repeat = [1,2,3,4,5,6,7,8]; 

  constructor() { }

  ngOnInit(): void {
  }

}
