import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private tokenValue = new BehaviorSubject(this.GetToken());
  private userValue = new BehaviorSubject(this.GetUser());
  private languageValue = new BehaviorSubject(this.GetLanguage())

  currentToken = this.tokenValue.asObservable();
  currentUser = this.userValue.asObservable();
  currentLanguage = this.languageValue.asObservable();

  constructor(private cookieService: CookieService) { }

  public changeToken(value: any){
    this.cookieService.set('token', value);
    this.tokenValue.next(value);
  }

  public GetToken(){
    return this.cookieService.get('token');
  }

  public changeUser(value: any){
    this.cookieService.set('user', value ?? '{}');
    this.userValue.next(value);
  }

  public GetUser(){
    if(this.cookieService.check('user'))
      return JSON.parse(this.cookieService.get('user'));
    else 
      return {};
  }

  public changeLanguage(value: any){
    this.cookieService.set('language', value);
    this.languageValue.next(value);
  }

  public GetLanguage(){
    return this.cookieService.get('language');
  }
}