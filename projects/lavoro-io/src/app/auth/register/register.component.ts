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
    name: new FormControl('Mario', Validators.required),
    surname: new FormControl('Rossi', Validators.required),
    email: new FormControl('mario.rossi@example.com', Validators.required),
    password: new FormControl('12345678', [Validators.required, Validators.minLength(8)]),
    confirm_password: new FormControl('12345678', Validators.required)
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
    }
  }
}
