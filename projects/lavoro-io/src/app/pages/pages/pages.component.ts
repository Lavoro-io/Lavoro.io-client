import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'io-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  isLogged: boolean = this.authService.isAuthenticated();
  user: any = this.authService.getLoggedUser();
  translations: any[] = [
    {code: 'it', title: 'Italiano (Italia)'},
    {code: 'en', title: 'English (United Kingdom)'},
  ]

  constructor(private authService: AuthService,
              public translate: TranslateService) {
    this.translate.addLangs(this.translations.map(lang => lang.code));
    this.translate.setDefaultLang(this.translations[0].code);
  }

  ngOnInit() {

  }

  switchLanguage(langCode: string){
    this.translate.use(langCode);
  }

  logout(){
    this.authService.logout();
  }
}
