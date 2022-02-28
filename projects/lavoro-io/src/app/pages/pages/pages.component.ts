import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { SystemService } from '../../services/system.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'io-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, OnDestroy {

  userSub: any;

  isLogged: boolean = this.authService.isAuthenticated();
  user: any;
  translations: any[] = [
    {code: 'it', title: 'Italiano (Italia)'},
    {code: 'en', title: 'English (United Kingdom)'},
  ]

  constructor(private authService: AuthService,
              public translate: TranslateService,
              private systemService: SystemService,
              private userService: UserService) {
    this.translate.addLangs(this.translations.map(lang => lang.code));
    this.translate.setDefaultLang(this.translations[0].code);
  }

  ngOnInit() {
    this.events();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

  private events(){
    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
    });
  }

  switchLanguage(langCode: string){
    this.translate.use(langCode);
  }

  logout(){
    this.authService.logout();
  }
}
