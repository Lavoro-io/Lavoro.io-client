import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService, ChatType } from 'src/app/services/chat.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { SystemService } from 'src/app/services/system.service';
import { UserService } from 'src/app/services/user.service';
import $ from 'jquery';

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
  chatId: any;
  messageLength: any = '0/255';

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
    this.signalR.newMessage.subscribe((message)=>{
      //console.log(message, this.messages);
      this.messages.push(message);

      setTimeout(()=>{
        this.ScrollToEnd('#chatMessages');
      },0);
    });

    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
    });

    // Get userId from url if present
    this.routerSub = this.activeRouter.params.subscribe((params:any) =>{
      this.chatId = params['chatId'];

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
    this.signalR.SendMessage(this.selectedChat.chatId, message);

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
      if(this.chatId !== undefined || this.chatId !== null)
        this.SelectedChat(this.chatId);

    });
  }

  SelectedChat(chatId: any){
    this.chatService.GetChatDetail(chatId).then((chat: any)=>{
      if(this.selectedChat !== undefined) this.signalR.LeaveChat(this.selectedChat.chatId);
      if(chat === null) return;

      this.selectedChat = chat;
      this.signalR.JoinChat(chat.chatId);

      this.chatService.GetMessages(chatId).then((messages: any)=>{
        this.messages = messages;
        setTimeout(()=>{
          this.ScrollToEnd('#chatMessages');
        },0);
      });
    });
  }

  ScrollToEnd(elementName: string){
    const element = $(elementName)[0];
    element?.scrollTo(0, element.scrollHeight);  
  }

  CloseContactSelectorModal(){
    this.contactForm.reset();
  }

  OnMessageChange(params: any) {
    const maxLength = params.target.maxLength;
    const currentLength = params.target.value.length;

    this.messageLength = currentLength + "/" + maxLength;

    //console.log('change', params.target.maxLength, params.target.value.length);
  }
}