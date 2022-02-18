import { Injectable } from '@angular/core';
import settings from './../src/assets/settings.json';

@Injectable({
  providedIn: 'root'
})

export class AppManagerService {

  constructor() { }

  public getSettings() { return settings; }
}
