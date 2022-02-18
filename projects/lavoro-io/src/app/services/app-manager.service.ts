import { Injectable } from '@angular/core';
import settings from '../../assets/settings.json';
import users from '../../assets/mock/users.json';

@Injectable({
  providedIn: 'root'
})

export class AppManagerService {

  constructor() { }

  public getSettings() { return settings; }

  public getUser(uuid: string){
    const user = users.users.filter(x => x.uuid === uuid)[0];
    return user;
  }
}
