import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import users from './../../assets/mock/users.json';
import settings from './../../assets/settings.json';

const httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
})

const authController = 'auth/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token: string | undefined;

  constructor(private jwtHelper: JwtHelperService,
              private router: Router,
              private httpClient: HttpClient) { }

  public isAuthenticated(): boolean{
    this.token = localStorage.getItem('token')?.toString();
    const expired = this.jwtHelper.isTokenExpired(this.token);
    return !expired;
  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }

  public getLoggedUser(){
    if(this.isAuthenticated()){
      const data = this.jwtHelper.decodeToken(this.token);
      return data;
    }
  }

  public login(email: string, password: string): any{

    var user = users.users.filter(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password)[0];

    this.getToken(email, password).then((res:any) => {
      console.log(res);
      user.token = res
    });
    
    if(user){
      localStorage.setItem('token', user.token);
      return user;  
    }

    return null;
  }

  private getToken(email: string, password: string){
    return new Promise((resolve)=>{

      var body = {
        email: email,
        password: password
      }

      return this.httpClient.post(settings.IdentityProviderEndpoint + authController + 'token', JSON.stringify(body), {headers: httpHeader, responseType: "text"})
        .subscribe((res)=>{
          resolve(res);
        }, (err)=>{
          console.log(err);
        })
    });
  }
}
