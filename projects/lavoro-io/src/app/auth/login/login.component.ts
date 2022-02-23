import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'io-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isValid: boolean | undefined;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('12345678', [Validators.required,Validators.minLength(8), Validators.maxLength(32)])
  })

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then((user: any)=>{
      if(user !== null){
        this.isValid = true;
        setTimeout(() => {
          this.router.navigate(['pages/profile', user.userId]);
        }, 1500);
      } else 
        this.isValid = false;  
    });
  }
}
