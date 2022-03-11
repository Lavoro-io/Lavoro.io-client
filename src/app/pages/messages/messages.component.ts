import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  routerSub: any;
  user: any;
  uuid: any;
  datePipe: DatePipe = new DatePipe('');

  users: any[] = [];
  selectedUser: any;

  messages: any[] = [];

  messageForm = new FormGroup({
    message: new FormControl('', Validators.required)
  })

  constructor(private signalR: SignalRService,
              private userService: UserService,
              private systemService: SystemService,
              private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.events();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  events(){
    this.signalR.addChatMessageListener();
    this.signalR.newMessage.subscribe((message)=>{
      //console.log(message, this.messages);
      this.messages.push(message);
    });

    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
      this.GetUsers();
    });

    // Get userId from url if present
    this.routerSub = this.activeRouter.params.subscribe((params:any) =>{
      this.uuid = params['uuid'];
      
      if(this.uuid !== undefined)
        this.SelectedUser(this.uuid);
    });
  }

  SendMessage(){
    const message = this.messageForm.controls['message'].value;
    this.signalR.sendMessage(this.selectedUser.userId, message);

    this.messageForm.reset();
  }

  GetUsers(){
    this.userService.GetUsers().then((users)=>{
      this.users = (users as any[]).filter(x => x.userId !== this.user.userId);   

      // For first time if uuid is not present on url
      if(this.uuid !== undefined)
        this.SelectedUser(this.uuid);

    });
  }

  SelectedUser(userId: any){
    this.selectedUser = this.users.filter(x => x.userId === userId)[0];
    //console.log(this.selectedUser);
  }

  getDateTimeNow(): string{
    const date = new Date().toLocaleString();
    return date as string;
  }
}
