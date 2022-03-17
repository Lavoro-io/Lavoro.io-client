import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import settings from '../../assets/settings.json';
import { SystemService } from './system.service';

const userController = 'user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  tokenSub: any;

  constructor(private httpClient: HttpClient,
              private systemService: SystemService) {
    this.tokenSub = this.systemService.currentToken.subscribe((token)=>{
      this.httpHeader = this.httpHeader.delete('Authorization');

      if(token !== '')
        this.httpHeader = this.httpHeader.append('Authorization', 'Bearer ' + token);
    });
  }

  public GetUser(uuid: any){
    return new Promise((resolve)=>{
      return this.httpClient.get(settings.ServiceEndpoint + userController + "/GetUser/?uuid=" + uuid, {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(res);
        }, (err)=>{
          console.log(err);
          resolve(null);
        })
    });
  }

  public GetUsers(){
    return new Promise((resolve)=>{
      return this.httpClient.get(settings.ServiceEndpoint + userController + "/GetUsers", {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(res);
        }, (err)=>{
          console.log(err);
          resolve(null);
        })
    });
  }

  public UpdateUser(username: string, name: string, surname: string, profilePicture: string, backgroundImage: string){
    return new Promise((resolve)=>{

      const body = {
        username: username,
        name: name,
        surname: surname,
        profilePicture: profilePicture,
        backgroundImage: backgroundImage
      }

      return this.httpClient.put(settings.ServiceEndpoint + userController + '/UpdateUser', body, {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(res);
        }, (err)=>{
          console.log(err);
          resolve(null);
        })
    });
  }
}
