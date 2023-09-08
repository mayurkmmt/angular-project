import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
  isMobile: boolean;
  isLogin = false;
  constructor(private deviceService: DeviceDetectorService,
    private router: Router, private route: ActivatedRoute,
    ) { this.isMobile = this.deviceService.isMobile();}

  ngOnInit(): void {
    let applierUser = JSON.parse(localStorage.getItem('userData'));
    if(applierUser == null){
      this.isLogin = false;
    }else if(applierUser.role == 2){
      this.isLogin = true;
      this.router.navigate([`/dashboard`]);
    }else {
      this.isLogin = true;
      this.router.navigate([`/company`]);
    }
  }

}
