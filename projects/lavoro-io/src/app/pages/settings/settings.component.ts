import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SystemService } from '../../services/system.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'io-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userSub: any;

  // uuid: any;
  profileForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private userService: UserService,
              private systemService: SystemService) {

  }

  ngOnInit(): void {
    this.events();
  }

  private events() {
    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      // this.uuid = user.userId;
      this.profileForm.controls['username'].patchValue(user.username);
      this.profileForm.controls['name'].patchValue(user.name);
      this.profileForm.controls['surname'].patchValue(user.surname);
      this.profileForm.controls['email'].patchValue(user.email);

      this.profileForm.markAsPristine();
    });
  }

  onSubmit(){
    this.userService.UpdateUser(this.profileForm.controls['username'].value, 
                                this.profileForm.controls['name'].value, 
                                this.profileForm.controls['surname'].value).then((newUser) =>
    {
      
      if(newUser !== undefined){
        this.systemService.changeUser(newUser);
      }
      window.location.reload();
    });
  }

}
