import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private tokenValue = new BehaviorSubject(this.cookieService.get('token'));
  private userValue = new BehaviorSubject(JSON.parse(this.cookieService.get('user') as any ?? '{}'));
  private languageValue = new BehaviorSubject(this.cookieService.get('language'))

  currentToken = this.tokenValue.asObservable();
  currentUser = this.userValue.asObservable();
  currentLanguage = this.languageValue.asObservable();

  constructor(private cookieService: CookieService) { }

  public changeToken(value: any){
    this.cookieService.set('token', value);
    this.tokenValue.next(value);
  }

  public GetToken(){
    return this.tokenValue.value;
  }

  public changeUser(value: any){
    this.cookieService.set('user', value);
    this.userValue.next(value);
  }

  public GetUser(){
    return this.userValue.value;
  }

  public changeLanguage(value: any){
    this.cookieService.set('language', value ?? '');
  }
}