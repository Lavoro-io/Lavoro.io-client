import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'io-RegisterComponent',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isValid?: boolean | null;

  registerForm = new FormGroup({});

  constructor(private appManager: UserService,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('', [Validators.required]),
    },
    {
      validator: this.MatchPassword('password','confirm_password')
    })
  }

  onSubmit(){
    this.isValid = null;

    const name = this.registerForm.controls['name'].value;
    const surname = this.registerForm.controls['surname'].value;
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;

    this.authService.register(name, surname, email, password).then((res: any)=>{
      this.isValid = res;
      setTimeout(()=>{
        this.router.navigate(['auth/login'])
      },3000);
    });
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
