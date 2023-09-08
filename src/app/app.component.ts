import { AfterViewInit, Component, OnInit, ViewChild,Output ,EventEmitter} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { filter, map } from "rxjs/operators";
import { AuthService } from "./services/auth.service";
import { NotificationService } from "./services/notification.service";

import { environment } from "../environments/environment";
import { Subscription } from "rxjs";
import { JobService } from "./services/job.service";
declare var _paq: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appTitle = 'JobPortal';
  public deviceInfo = null;
  public isMobile = false;
  public isTablet = false;
  public isDesktop = false;
  public isRegisterPage = false;
  public isResetPasswordPage = false;
  public isRedirectPage = false;
  public isLoginPage = false;
  public isRegisterCompany = false;
  public isCompanyLogin = false;
  public loggedInUser: any;
  public isCompany = false;
  public isPublicJobOverview = false;
  public unreadCount = 0;
  visible: boolean = false;

  @ViewChild('snav', { static: true }) public Navbar: MatSidenav;
  @ViewChild('drawer', { static: true }) public Navbars: MatSidenav;
  subscriptions: Array<Subscription> = [];
  seoJobId: number;
  constructor(private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private deviceService: DeviceDetectorService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private authService: AuthService,
    private jobService: JobService,
    private notificationService: NotificationService) {
    this.detectDevice();
    this.isMobilefunc();
    this.isTabletfunc();
    this.isDesktopfunc();
    this.router.events.subscribe((event) => {
      this.isRegisterPage = this.router.routerState.snapshot.url == "/register";
      if (!this.isRegisterPage) {
        this.isRegisterPage = this.router.routerState.snapshot.url == "/register2";
      }
      this.isResetPasswordPage = this.router.routerState.snapshot.url.includes('reset-password');
      this.isCompanyLogin = this.router.routerState.snapshot.url.includes('login-company');
      this.isRegisterCompany = this.router.routerState.snapshot.url.includes('register-company');
      this.isPublicJobOverview = this.router.routerState.snapshot.url.includes('public/job/overview');
      this.isPublicJobOverview = this.router.routerState.snapshot.url.includes('public/job');
      this.isLoginPage = this.router.routerState.snapshot.url == "/login";
      if (this.isPublicJobOverview) {
        let url = window.location.pathname;
        this.seoJobId = +url.substring(url.lastIndexOf('/') + 1);
      }
      this.visible = false;
    });
  }

  ngOnInit() {
    if(window.location.pathname == '/login'){
      this.isRedirectPage = true;
    }
    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: "white",
          text: "black"
        },
        button: {
          background: "#2fa16f;",
          // text: "#164969"
        }
      },
      theme: "classic",
      content: {
        message: "Wir verwenden Cookies, um Inhalte zu personalisieren. Wenn du auf unsere Website klickst oder hier navigierst, stimmst du der Erfassung von Informationen durch Cookies zu. Weitere Informationen: </a>",
        dismiss: "OK",
        link: 'Datenschutzerklärung',
        href: "https://jobportal.com/datenschutz/",
      },
      onStatusChange: function (status, chosenBefore) {
        if (typeof _paq !== 'undefined') {
          // 720h = 1 month
          _paq.push(['rememberConsentGiven', 720]);
        }
        console.log("call cookied")
      },
    });

    const appTitle = this.title.getTitle();
    this.loggedInUser = this.authService.getUserData();
    if (this.loggedInUser?.role == environment.ROLE_COMPANY) {
      this.isCompany = true;
    }
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.loginEmiter(event)
        this.title.setTitle(this.appTitle + ' | ' + ttl);
      });
      if(this.loggedInUser){
        this.getUnreadNotificationCount();
      }
  }

  close(reason: string) {
    console.log(reason)
    this.visible = false
  }

  onAcceptCookie() {
    if (typeof _paq !== 'undefined') {
      // 720h = 1 month
      _paq.push(['rememberConsentGiven', 720]);
    }
  }

  fwdMsgToSib2($event) {
    this.getUnreadNotificationCount();
  }
  fwdMsgToSib3($event) {
     this.visible = false
  }

  logoutEmiter($event) {
    this.loggedInUser = "";
    this.isPublicJobOverview = true;
    this.ngOnInit();
 }

 loginEmiter($event) {
  this.loggedInUser = this.authService.getUserData();
    // this.ngOnInit()
 }

  toggle() {
    this.visible = !this.visible;
    // console.log(this.visible)
    if (this.visible) {
      // console.log("Ifff")
      // this.visible = false
    } else {
      // this.visible = true
      // console.log("Elllse")
    }
  }

  public getUnreadNotificationCount() {
    let res;
    this.notificationService.getUnreadNotificationCount().subscribe(resData => {
      resData;
      res = resData;
      this.unreadCount =  res.count;
    }, error => {
      console.log("error occurred");
      console.log(error);
    });
  }

  public detectDevice() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  public isMobilefunc() {
    this.isMobile = this.deviceService.isMobile();
    if (this.isMobile) {
      console.log("mobile");
    }
  }

  public isMobileClose() {
    if (this.isMobile) {
      this.Navbar.close();
    }
  }

  public isTabletfunc() {
    this.isTablet = this.deviceService.isTablet();
    if (this.isTablet) {
      console.log("tablet");
    }
  }

  public isDesktopfunc() {
    this.isDesktop = this.deviceService.isDesktop();
    if (this.isDesktop) {
      console.log("desktop");
    }
  }

  public mobileNavCLose() {
    if (this.isMobile) {
      this.Navbar.toggle();
    }
  }

  public getSideNavmode() {
    if (this.isMobile) {
      return "over"
    } else {
      return "side"
    }
  }
}
