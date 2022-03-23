import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  langSub: any;

  langCode: any;
  isLogged: boolean = this.authService.isAuthenticated();
  user: any;
  translations: any[] = [
    {code: 'it', title: 'Italiano (Italia)'},
    {code: 'en', title: 'English (United Kingdom)'},
  ]
  languageSelector = new FormGroup({
    language: new FormControl(this.translations[0].code)
  })

  constructor(private authService: AuthService,
              public translate: TranslateService,
              private systemService: SystemService) {
    this.translate.addLangs(this.translations.map(lang => lang.code));
    this.translate.setDefaultLang(this.translations[0].code);
  }

  ngOnInit() {
    this.events();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.langSub.unsubscribe();
  }

  private events(){
    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
    });

    this.langSub = this.systemService.currentLanguage.subscribe((langCode: any)=>{
      //console.log(langCode);
      this.languageSelector.controls['language'].patchValue(langCode);
      this.langCode = langCode;
      this.translate.use(langCode);
    })
  }

  switchLanguage(langCode: string){
    this.systemService.changeLanguage(langCode);
  }

  logout(){
    this.authService.logout();
  }
}
