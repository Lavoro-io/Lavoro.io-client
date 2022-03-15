import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import settings from '../../assets/settings.json';
import { SystemService } from './system.service';

const chatController = 'chat';

export const enum ChatType{
  Sys = 0,
  Private,
  Group
} 

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  user: any;
  
  tokenSub: any;
  userSub: any;
  
  constructor(private httpClient: HttpClient,
              private systemService: SystemService) {
    this.events();
  }

  private events(){
    this.tokenSub = this.systemService.currentToken.subscribe((token)=>{
      this.httpHeader = this.httpHeader.delete('Authorization');

      if(token !== '')
        this.httpHeader = this.httpHeader.append('Authorization', 'Bearer ' + token);
    });

    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
    });
  }

  public GetChats(uuid: any){
    return new Promise((resolve)=>{
      return this.httpClient.get(settings.ServiceEndpoint + chatController + "/GetChats/?uuid=" + uuid, {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(res);
        }, (err)=>{
          console.log(err);
          resolve(null);
        })
    });
  }

  public GetChatDetail(chatId: any){
    return new Promise((resolve)=>{
      return this.httpClient.get(settings.ServiceEndpoint + chatController + "/GetChatDetail?chatId=" + chatId, {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(res);
        }, (err)=>{
          console.log(err);
          resolve(null);
        })
    });
  }

  public AddChat(uuid: any[], chatType: ChatType){
    return new Promise((resolve)=>{
      var body = uuid;

      return this.httpClient.post(settings.ServiceEndpoint + chatController + "/NewChat?chatType=" + chatType, JSON.stringify(body), {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(true);
        }, (err)=>{
          console.log(err.error.text);
          resolve(false);
        })
    });
  }

  public RemoveChat(chatId: any){
    return new Promise((resolve)=>{
      return this.httpClient.delete(settings.ServiceEndpoint + chatController + "/RemoveChat?chatId=" + chatId, {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(true);
        }, (err)=>{
          console.log(err.error.text);
          resolve(false);
        })
    });
  }
}
