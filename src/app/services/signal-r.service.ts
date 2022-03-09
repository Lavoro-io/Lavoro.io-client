import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import settings from '../../assets/settings.json';
import { SystemService } from './system.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private opts =  { accessTokenFactory: () => this.systemService.currentToken};
  private hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
                                                  .withUrl(settings.UserServiceEndpoint + settings.Hubs[0])
                                                  .build();

  constructor(private systemService: SystemService) { }

  public startConnection = () => {
    this.hubConnection.serverTimeoutInMilliseconds = 24000;
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public closeConnection = () => {
    this.hubConnection
      .stop()
      .then(() => console.info('Connection stopped'))
      .catch(err => console.error('Error while stopping connection: ' + err))
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
    this.hubConnection.invoke('addChatMessage', connectionId, message)
      .catch(err => console.error(err));
  }
  //#endregion
}