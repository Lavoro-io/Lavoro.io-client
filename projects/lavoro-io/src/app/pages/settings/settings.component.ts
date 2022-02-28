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
      this.profileForm.controls['username'].patchValue(user.username);
      this.profileForm.controls['name'].patchValue(user.name);
      this.profileForm.controls['surname'].patchValue(user.surname);
      this.profileForm.controls['email'].patchValue(user.email);

      this.profileForm.markAsPristine();
    });
  }

}
