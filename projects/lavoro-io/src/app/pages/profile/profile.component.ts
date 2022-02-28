import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'io-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userSub: any;
  routerSub: any;

  uuid: string = '';
  user: any;
  itsMe: boolean = false;
  follow: boolean = false;

  constructor(private activeRouter: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private systemService: SystemService) { }

  ngOnInit(): void {
    this.events();
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  private events(){

    this.userSub = this.systemService.currentUser.subscribe((user)=>{
      this.user = user;
    });

    this.routerSub = this.activeRouter.params.subscribe((params:any) =>{
      this.uuid = params['uuid'];

      if(this.uuid === undefined) this.uuid = this.user.userId;

      this.userService.getUser(this.uuid).then((user:any)=>{
        this.user = user;

        if(this.uuid === this.user.userId) this.itsMe = true;

        if(this.user === undefined) this.router.navigate(['pages/not-found']);  
      });

    });
  }
}
