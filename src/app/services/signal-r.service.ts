import { Injectable, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import settings from '../../assets/settings.json';
import { SystemService } from './system.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {

  userSub: any;
  user: any;

  private hubConnection: any;

  constructor(private systemService: SystemService) { 
    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;

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
      console.log(message);
    });
  }

  //#endregion
  
  //#region Invokes
  public sendMessage(connectionId: string, message: string){
    this.hubConnection.invoke('SendChatMessage', connectionId, message)
      .catch((err:any) => console.error(err));
  }
  //#endregion
}