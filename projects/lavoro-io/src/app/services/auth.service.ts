import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import settings from './../../assets/settings.json';
import { SystemService } from './system.service';

const authController = 'auth/';

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
    localStorage.clear();
    this.httpHeader.delete('')
    this.router.navigate(['auth/login']);
  }

  public login(email: string, password: string){
    return new Promise((resolve)=>{
      this.getToken(email, password).then((res:any) => {

        const auth = res;
        this.systemService.changeToken(auth.token);
        resolve(auth.uuid);
      });  
    })
  }

  private getToken(email: string, password: string){
    return new Promise((resolve)=>{

      var body = {
        email: email,
        password: password
      }

      return this.httpClient.post(settings.IdentityProviderEndpoint + authController + 'token', JSON.stringify(body), {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(res);
        }, (err)=>{
          console.log(err);
        })
    });
  }
}
