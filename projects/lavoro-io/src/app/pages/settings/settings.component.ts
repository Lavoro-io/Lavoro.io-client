import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../services/system.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'io-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService,
              private systemService: SystemService) {

  }

  ngOnInit(): void {
  }

}
