import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppManagerService } from 'projects/lavoro-io/src/app/services/app-manager.service';

@Component({
  selector: 'io-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isValid: boolean | undefined;

  loginForm = new FormGroup({
    email: new FormControl('dev', Validators.required),
    password: new FormControl('12345678', [Validators.required,Validators.minLength(8)])
  })

  constructor(private appManager: AppManagerService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = this.appManager.getSettings().user;
    this.isValid = (user.username === this.loginForm.value.email) && (user.password === this.loginForm.value.password);

    const jwt = this.appManager.getSettings().jwt;

    if(this.isValid){
      localStorage.setItem('token', jwt.token);

      setTimeout(() => {
        this.router.navigate(['pages']);
      }, 1000);
    }
  }
}
