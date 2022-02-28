import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private tokenValue = new BehaviorSubject(localStorage.getItem('token'));
  private userValue = new BehaviorSubject(JSON.parse(localStorage.getItem('user') ?? '{}'));

  currentToken = this.tokenValue.asObservable();
  currentUser = this.userValue.asObservable();

  constructor() { }

  public changeToken(value: any){
    localStorage.setItem('token', value ?? '');
    this.tokenValue.next(value);
  }

  public changeUser(value: any){
    localStorage.setItem('user', JSON.stringify(value));
    this.userValue.next(value);
  }
}
