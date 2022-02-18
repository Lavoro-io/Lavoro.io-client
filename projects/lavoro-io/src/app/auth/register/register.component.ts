import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppManagerService } from 'projects/lavoro-io/src/app/services/app-manager.service';

@Component({
  selector: 'io-RegisterComponent',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isValid: boolean | undefined;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  })

  constructor(private appManager: AppManagerService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.isValid = this.registerForm.value.password === this.registerForm.value.confirm_password;

    if(this.isValid){
      //send confirmation email
      setTimeout(()=>{
        this.router.navigate(['auth/login'])
      },5000);
    } else {
      //show alert
    }
  }
}
