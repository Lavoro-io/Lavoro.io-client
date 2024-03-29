import { Injectable, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import settings from '../../assets/settings.json';
import { SystemService } from './system.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {

  userSub: any;
  user: any;

  newMessage = new BehaviorSubject('');

  private hubConnection: any;

  constructor(private systemService: SystemService) { 
    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
      
      if(this.user?.userId === undefined) return;

      this.closeConnection();

      this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(settings.ServiceEndpoint + settings.Hub + '?uuid=' + this.user.userId)
                            .build();
      
      this.startConnection();
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public startConnection = () => {
    if(this.hubConnection === undefined) return;

    this.hubConnection.serverTimeoutInMilliseconds = 24000;
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.StartListeners();
      })
      .catch((err: any) => console.log('Error while starting connection: ' + err))
  }

  public closeConnection = () => {
    if(this.hubConnection === undefined) return;

    this.hubConnection
      .stop()
      .then(() => console.info('Connection stopped'))
      .catch((err: any) => console.error('Error while stopping connection: ' + err))
  }

  StartListeners(){
    this.AddChatMessageListener();
  }

  //#region Listeners
  public AddChatMessageListener = () => {
    this.hubConnection.on('addChatMessage', (message: any) => {
      //console.log('addChatMessage',message);
      this.newMessage.next(message);
    });
  }
  //#endregion
  
  //#region Invokes
  public JoinChat(chatId: any){
    this.hubConnection.invoke('JoinChat', chatId)
      .catch((err:any) => console.error(err));
  }

  public LeaveChat(chatId: any){
    this.hubConnection.invoke('LeaveChat', chatId)
      .catch((err:any) => console.error(err));
  }

  public SendMessage(userId: string, message: string){
    this.hubConnection.invoke('SendChatMessage', userId, message)
      .catch((err:any) => console.error(err));
  }
  //#endregion
}