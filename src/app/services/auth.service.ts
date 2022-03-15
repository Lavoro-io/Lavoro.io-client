import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import settings from '../../assets/settings.json';
import { SignalRService } from './signal-r.service';
import { SystemService } from './system.service';

const authController = 'auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnDestroy{

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  user: any;
  
  tokenSub: any;
  userSub: any;

  constructor(private jwtHelper: JwtHelperService,
              private router: Router,
              private httpClient: HttpClient,
              private systemService: SystemService,
              private signalRservice: SignalRService) {
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

  ngOnDestroy() {
    this.tokenSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  public isAuthenticated(): boolean{
    let token = localStorage.getItem('token')?.toString();
    const expired = this.jwtHelper.isTokenExpired(token);
    return !expired;
  }

  public logout(){
    this.signalRservice.closeConnection();
    localStorage.clear();
    this.httpHeader.delete('')
    this.router.navigate(['auth/login']);
  }

  public login(email: string, password: string){
    return new Promise((resolve)=>{
      this.getToken(email, password).then((res:any) => {
        if(res === null) resolve(null);

        const auth = res;
        this.systemService.changeToken(auth.token);
        
        resolve(auth.uuid);
      }, (err)=>{
        resolve(null);
      });  
    })
  }

  private getToken(email: string, password: string){
    return new Promise((resolve)=>{

      var body = {
        email: email,
        password: password
      }

      return this.httpClient.post(settings.ServiceEndpoint + authController + '/token', JSON.stringify(body), {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(res);
        }, (err)=>{
          console.log(err);
          resolve(null);
        })
    });
  }

  public register(name: string, surname: string, email: string, password: string){
    return new Promise((resolve)=>{
      var body = {
        name: name,
        surname: surname,
        email: email,
        password: password
      }

      return this.httpClient.post(settings.ServiceEndpoint + authController + '/register', JSON.stringify(body), {headers: this.httpHeader})
        .subscribe((res: any)=>{
          resolve(res);
        }, (err)=>{
          resolve(false);
      });
    })
  }}
