import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import users from './../../assets/mock/users.json';
import settings from './../../assets/settings.json';

const authController = 'auth/';
const userController = 'user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token: string | undefined;
  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private jwtHelper: JwtHelperService,
              private router: Router,
              private httpClient: HttpClient) { }

  public isAuthenticated(): boolean{
    this.token = localStorage.getItem('token')?.toString();
    this.httpHeader = this.httpHeader.append('Authorization', 'Bearer ' + this.token);
    const expired = this.jwtHelper.isTokenExpired(this.token);
    return !expired;
  }

  public logout(){
    localStorage.clear();
    this.httpHeader.delete('')
    this.router.navigate(['auth/login']);
  }

  public getLoggedUser(){
    if(this.isAuthenticated()){
      const user = localStorage.getItem('user');
      const data = JSON.parse(user ?? '{}');
      return data;
    }
  }

  public login(email: string, password: string){
    return new Promise((resolve)=>{
      this.getToken(email, password).then((res:any) => {

        const auth = JSON.parse(res);

        this.token = auth.token;
  
        localStorage.setItem('token', this.token ?? '');
        this.httpHeader = this.httpHeader.append('Authorization', 'Bearer ' + this.token);
  
        this.getUser(auth.uuid).then((userRes)=>{
          const user = userRes;
          localStorage.setItem('user', JSON.stringify(user));
          //console.log(user);
          resolve(user);
        });
      });  
    })
  }

  private getToken(email: string, password: string){
    return new Promise((resolve)=>{

      var body = {
        email: email,
        password: password
      }

      return this.httpClient.post(settings.IdentityProviderEndpoint + authController + 'token', JSON.stringify(body), {headers: this.httpHeader, responseType: "text"})
        .subscribe((res)=> {
          resolve(res);
        }, (err)=>{
          console.log(err);
        })
    });
  }

  public getUser(uuid: any){
    return new Promise((resolve)=>{

      return this.httpClient.get(settings.UserServiceEndpoint + userController + "?uuid=" + uuid, {headers: this.httpHeader})
        .subscribe((res)=> {
          resolve(res);
        }, (err)=>{
          resolve(undefined);
        })
    });
  }
}
