import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService,
              private router: Router) { }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem('token')?.toString();
    const expired = this.jwtHelper.isTokenExpired(token);
    return !expired;
  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }
}
