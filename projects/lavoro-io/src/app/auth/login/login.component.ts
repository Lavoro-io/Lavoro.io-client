import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SystemService } from '../../services/system.service';
import { UserService } from '../../services/user.service';

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
              private userService: UserService,
              private systemService: SystemService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then((uuid: any)=>{
      this.userService.GetUser(uuid).then((user)=>{
        this.systemService.changeUser(user);
        if(user !== null){
          this.isValid = true;
          setTimeout(() => {
            this.router.navigate(['pages/profile', uuid]);
          }, 1500);
        } else 
          this.isValid = false;  
      });
    });
  }
}
