import { Injectable } from '@angular/core';
import settings from '../../assets/settings.json';

@Injectable({
  providedIn: 'root'
})

export class AppManagerService {

  constructor() { }

  public getSettings() { return settings; }
}
