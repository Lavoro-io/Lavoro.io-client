import { Component, OnDestroy, OnInit } from '@angular/core';
import { SystemService } from 'src/app/services/system.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'io-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  userSub: any;
  user: any;
  
  users: any[] = [];

  constructor(private userService: UserService,
              private systemService: SystemService) { 
  }

  ngOnInit(): void {
    this.events();
    this.GetUsers();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  events(){
    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
    });
  }

  GetUsers(){
    this.userService.GetUsers().then((users)=>{
      this.users = (users as any[]).filter(x => x.userId !== this.user.userId);
      // console.log(users);
    });
  }
}
