import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppManagerService } from '../../services/app-manager.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'io-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  subRouter: any;
  uuid: string = '';
  user: any;
  itsMe: boolean = false;
  follow: boolean = false;

  constructor(private activeRouter: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private appManager: AppManagerService) { }

  ngOnInit(): void {
    this.subRouter = this.activeRouter.params.subscribe((params:any) =>{
      this.uuid = params['uuid'];

      const loggedUser = this.authService.getLoggedUser();

      if(this.uuid === undefined) this.uuid = loggedUser.sub;

      this.user = this.appManager.getUser(this.uuid);

      if(this.uuid === loggedUser.sub) this.itsMe = true;
      
      if(this.user === undefined) this.router.navigate(['pages/not-found']);

    });
  }

}
