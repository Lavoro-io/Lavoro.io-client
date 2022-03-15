import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService, ChatType } from 'src/app/services/chat.service';
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
  contacts: any;
  chatCode: any;
  datePipe: DatePipe = new DatePipe('');

  chats: any[] = [];
  selectedChat: any;

  messages: any[] = [];

  messageForm = new FormGroup({
    message: new FormControl('', Validators.required)
  })

  contactForm = new FormGroup({
    contact: new FormControl('', Validators.required)
  })

  constructor(private signalR: SignalRService,
              private userService: UserService,
              private chatService: ChatService,
              private systemService: SystemService,
              private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.GetUsers();
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
    });

    // Get userId from url if present
    this.routerSub = this.activeRouter.params.subscribe((params:any) =>{
      this.chatCode = params['uuid'];

      this.GetChats();
    });
  }

  GetUsers(){
    this.userService.GetUsers().then((users)=>{
      //console.log(users);
      this.contacts = (users as any[]).filter(x => x.userId !== this.user.userId);
    });
  }

  SendMessage(){
    const message = this.messageForm.controls['message'].value;
    this.signalR.SendMessage(this.selectedChat.chatCode, message);

    this.messageForm.reset();
  }

  AddChat(){
    const selectedContactId = this.contactForm.controls['contact'].value;
    var chatUsers = [];
    chatUsers.push(selectedContactId);
    chatUsers.push(this.user.userId);
    this.contactForm.reset();

    this.chatService.AddChat(chatUsers, ChatType.Private).then((added)=>{
      if(added){
        window.location.reload();
      }
    });
  }

  DeleteChat(chatId: any){
    this.chatService.RemoveChat(chatId).then((removed)=>{
      if(removed){
        window.location.reload();
      }
    });
  }

  GetChats(){
    this.chatService.GetChats(this.user.userId).then((chats)=>{
      //console.log('GetChats',chats);
      this.chats = (chats as any[]);

      // // For first time if uuid is not present on url
      if(this.chatCode !== undefined)
        this.SelectedChat(this.chatCode);

    });
  }

  SelectedChat(chatCode: any){
    this.chatService.GetChatDetail(chatCode).then((chat)=>{
      //console.log(chat);
      this.selectedChat = chat;
    });
  }

  getDateTimeNow(): string{
    const date = new Date().toLocaleString();
    return date as string;
  }

  CloseContactSelectorModal(){
    this.contactForm.reset();
  }
}