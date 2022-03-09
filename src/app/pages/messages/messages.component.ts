import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from 'src/app/services/signal-r.service';
import { SystemService } from 'src/app/services/system.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'io-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  userSub: any;
  user: any;

  users: any;
  selectedUser: any;

  messages: any[] = [];

  messageForm = new FormGroup({
    message: new FormControl('', Validators.required)
  })

  constructor(private signalR: SignalRService,
              private userService: UserService,
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
    this.signalR.addChatMessageListener();
    this.signalR.newMessage.subscribe((message)=>{
      this.messages.push(message);
    });

    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
    });
  }

  SendMessage(){
    const message = this.messageForm.controls['message'].value;
    this.signalR.sendMessage(this.selectedUser.userId, message);

    this.messageForm.reset();
  }

  GetUsers(){
    this.userService.GetUsers().then((users)=>{
      this.users = users;
    });
  }

  SelectedUser(user: any){
    this.selectedUser = user;
  }
}
