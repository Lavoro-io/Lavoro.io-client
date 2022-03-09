import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'io-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  userSub: any;
  user: any;

  constructor(private signalR: SignalRService,
              private systemService: SystemService) {
    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.signalR.addChatMessageListener();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  SendMessage(){
    this.signalR.sendMessage(this.user.userId,'Hello World');
  }
}
