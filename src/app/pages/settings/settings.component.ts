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
    email: new FormControl(''),
    profilePicture: new FormControl(''),
    backgroundImage: new FormControl('')
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
      // this.profileForm.controls['profilePicture'].patchValue(user.profilePicture);
      // this.profileForm.controls['backgroundImage'].patchValue(user.backgroundImage);

      this.profileForm.markAsPristine();
    });
  }

  onSubmit(){
    console.log(this.profileForm.controls['profilePicture']);
    console.log($('#profilePictureInput')[0])

    this.userService.UpdateUser(this.profileForm.controls['username'].value, 
                                this.profileForm.controls['name'].value, 
                                this.profileForm.controls['surname'].value,
                                this.profileForm.controls['profilePicture'].value,
                                this.profileForm.controls['backgroundImage'].value).then((newUser) =>
    {
      
      if(newUser !== undefined){
        this.systemService.changeUser(newUser);
      }
      window.location.reload();
    });
  }

  OnProfilePictureChange(event: any){
    const file = event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) =>{
      const file64 = myReader.result;
      this.profileForm.controls['profilePicture'].patchValue(file64);
      this.profileForm.markAsDirty();
      console.log(this.profileForm);
    }
    myReader.readAsDataURL(file);
  }

  OnBackgroundImageChange(event: any){
    const file = event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) =>{
      const file64 = myReader.result;
      this.profileForm.controls['backgroundImage'].patchValue(file64);
      this.profileForm.markAsDirty();
      console.log(this.profileForm);
    }
    myReader.readAsDataURL(file);
  }
}
