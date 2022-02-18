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

  constructor(private activeRouter: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private appManager: AppManagerService) { }

  ngOnInit(): void {
    this.subRouter = this.activeRouter.queryParams.subscribe((params:any) =>{
      this.uuid = params['uuid'];

      if(this.uuid === undefined) this.uuid = this.authService.getUser().sub;

      this.user = this.appManager.getUser(this.uuid);
      
      if(this.user === undefined) this.router.navigate(['pages/not-found']);

    });
  }

}
