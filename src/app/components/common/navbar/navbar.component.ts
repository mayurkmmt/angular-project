import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {environment} from "../../../../environments/environment";
import {SocialAuthService} from "angularx-social-login";
import {CompanyNotFoundWarningDialog} from "../../company/jobs/create-jobs/create-jobs.component";
import {JobService} from "../../../services/company/job.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  loggedInUser: any;
  isApplier = true;
  isUserLoggedIn = false;
  companyProfileUrl = '/company-profile';
  userData: any;
  public isMobile = false;
  events: string[] = [];
  opened: boolean;
  @Output() logoutEmiterNavbar = new EventEmitter<any>();
  @Output() msgToSibling2 = new EventEmitter<any>();
  mode = new FormControl('over');
  constructor(private authService: AuthService,
              private deviceService: DeviceDetectorService,
              private jobService: JobService) {
      this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
    this.userData = localStorage.getItem('userData');
    if (this.userData) {
      this.isUserLoggedIn = true;
    }
    this.getCompanyDetails();
    this.loggedInUser = this.authService.getUserData();
    if (this.loggedInUser?.role == environment.ROLE_COMPANY) {
      this.isApplier = false;
    }
  }

  getCompanyDetails() {
    if (this.isUserLoggedIn && this.userData.role == environment.ROLE_COMPANY) {
      this.jobService.getCompanyDetails().subscribe(resData => {
      }, errorMessage => {
        this.companyProfileUrl = '/add-company';
      });
    }
  }

  logout() {
    this.logoutEmiterNavbar.emit("hide");
    this.msgToSibling2.emit("hide");
    // document.getElementById("sidenav-bar").style.visibility = "hidden";
    this.isUserLoggedIn = false;
    this.authService.logout();
    if (this.isApplier) {
      this.authService.logout();
    } else {
      this.authService.companyLogout();
    }
  }

}
