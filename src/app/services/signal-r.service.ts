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
                            .withUrl(settings.ServiceEndpoint + settings.Hubs[0] + '?uuid=' + this.user.userId)
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
      .then(() => console.log('Connection started'))
      .catch((err: any) => console.log('Error while starting connection: ' + err))
  }

  public closeConnection = () => {
    if(this.hubConnection === undefined) return;

    this.hubConnection
      .stop()
      .then(() => console.info('Connection stopped'))
      .catch((err: any) => console.error('Error while stopping connection: ' + err))
  }

  //#region Listeners
  public addChatMessageListener = () => {
    this.hubConnection.on('addChatMessage', (message: string) => {
      this.newMessage.next(message);
    });
  }

  //#endregion
  
  //#region Invokes
  public sendMessage(userId: string, message: string){
    this.hubConnection.invoke('SendChatMessage', userId, message)
      .catch((err:any) => console.error(err));
  }
  //#endregion
}