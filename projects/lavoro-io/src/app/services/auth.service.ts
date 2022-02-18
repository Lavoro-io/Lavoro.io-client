import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import users from './../../assets/mock/users.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | undefined;

  constructor(private jwtHelper: JwtHelperService,
              private router: Router) { }

  public isAuthenticated(): boolean{
    this.token = localStorage.getItem('token')?.toString();
    const expired = this.jwtHelper.isTokenExpired(this.token);
    return !expired;
  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }

  public getUser(){
    if(this.isAuthenticated()){
      const data = this.jwtHelper.decodeToken(this.token);
      //console.log(data);
      return data;
    }
  }

  public login(mail: string, password: string): boolean{

    var user = users.users.filter(x => x.email === mail && x.password === password)[0];

    if(user){
      localStorage.setItem('token', user.token);
      return true;  
    }

    return false;
  }
}
