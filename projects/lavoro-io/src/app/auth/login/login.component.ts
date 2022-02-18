import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppManagerService } from 'projects/lavoro-io/services/app-manager.service';

@Component({
  selector: 'od-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private appManager: AppManagerService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = this.appManager.getSettings().user;
    const isLogged = (user.username === this.loginForm.value.email) && (user.password === this.loginForm.value.password);

    if(isLogged)
      this.router.navigate(['/pages']);
    else 
      console.log('username or password wrong');
  }
}
