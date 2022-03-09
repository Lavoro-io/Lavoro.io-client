import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'io-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private signalR: SignalRService) { }

  ngOnInit(): void {
  }

  SendMessage(){
    this.signalR.sendMessage('','Hello World');
  }
}
