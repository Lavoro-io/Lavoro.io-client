import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'io-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  isLogged: boolean = this.authService.isAuthenticated();

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  logout(){
    this.authService.logout();
  }
}
