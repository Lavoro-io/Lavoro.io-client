import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'io-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  repeat = [1,2,3,4,5,6,7,8]; 
  users: any;

  constructor(private userService: UserService) { 
    this.GetUsers();
  }

  ngOnInit(): void {
  }

  GetUsers(){
    this.userService.GetUsers().then((users)=>{
      this.users = users;
      // console.log(users);
    });
  }
}
