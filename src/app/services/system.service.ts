import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private tokenValue = new BehaviorSubject(localStorage.getItem('token'));
  private userValue = new BehaviorSubject(JSON.parse(localStorage.getItem('user') ?? '{}'));
  private languageValue = new BehaviorSubject(localStorage.getItem('language') ?? 'it');

  currentToken = this.tokenValue.asObservable();
  currentUser = this.userValue.asObservable();
  currentLanguage = this.languageValue.asObservable();

  constructor() { }

  public changeToken(value: any){
    localStorage.setItem('token', value ?? '');
    this.tokenValue.next(value);
  }

  public changeUser(value: any){
    localStorage.setItem('user', JSON.stringify(value));
    this.userValue.next(value);
  }

  public changeLanguage(value: any){
    localStorage.setItem('language', value ?? '');
    this.languageValue.next(value);
  }
}
