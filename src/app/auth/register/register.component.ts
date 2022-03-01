import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'io-RegisterComponent',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isValid: boolean | undefined;

  registerForm = new FormGroup({});

  constructor(private appManager: UserService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: new FormControl('Mario', Validators.required),
      surname: new FormControl('Rossi', Validators.required),
      email: new FormControl('mario.rossi@example.com', Validators.required),
      password: new FormControl('12345678', [Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('12345678', [Validators.required]),
    },
    {
      validator: this.MatchPassword('password','confirm_password')
    })
  }

  onSubmit(){
    this.isValid = this.registerForm.valid;
    console.log(this.registerForm);

    if(this.isValid){
      //send confirmation email
      setTimeout(()=>{
        this.router.navigate(['auth/login'])
      },5000);
    }
  }

  private MatchPassword(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['required']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({required: true});
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
}
