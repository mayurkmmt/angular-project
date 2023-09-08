import {Component, OnInit,OnChanges, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceDetectorService} from "ngx-device-detector";
import {ApplicantService} from "../../services/applicant.service";
import {Router,ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot,  CanActivate} from "@angular/router";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
declare var _paq: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  signInForm: FormGroup;
  public isMobile = false;
  isError = false;
  errorMessage: string;
  returnUrl: string;
  user: SocialUser;
  loggedIn: boolean;
  loggedInUser: any;
  isRegister = true;
  hide = true;
  isSpinner = false;
  //Here we injecting other services which we will used in this service.
  constructor(private deviceService: DeviceDetectorService,
              private dialog: MatDialog,
              private applicantService: ApplicantService,
              private router: Router,
              private route: ActivatedRoute,
              private socialAuthService: SocialAuthService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    //initialize signIn form.
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(false)
    });

    //initialize social-x auth
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.doSocialSignIn();
    });
    if(this.route.snapshot.queryParams['returnUrl']){
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    if(this.route.snapshot.queryParams['isverified']){
      let sts = this.route.snapshot.queryParams['isverified'];
      let msg = (sts == "true") ? "Dein Account ist schon validiert, du kannst dich mit deinen Anmeldedaten einloggen." : "Der Validierungslink für deinen Account ist abgelaufen. Wir haben dir soeben einen Neuen Validierungslink erstellt. \n Bitte prüfe deine Mails und klicke auf den Button.";
      const dialogRef = this.dialog.open(ErrorDialog, {
        data: {
          errorMessage: msg
        }
      });
    }
    let applierUser = JSON.parse(localStorage.getItem('userData'));
    if(applierUser?.role == 2) {
      window.location.href = `/dashboard`;
    } else if(applierUser?.role == 3) {
      window.location.href = `/company`;
    }
  }

  //to do login with facebook.call google API to get details.
  signInWithFB() {
    this.isSpinner = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  //to do login with google.call google API to get details.
  signInWithGoogle() {
    this.isSpinner = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  //to do social Login.
  doSocialSignIn() {
    this.isSpinner = true;
    if (this.user) {
      let postData = {
        first_name: this.user?.firstName,
        last_name: this.user?.lastName,
        email: this.user?.email,
        token: this.user?.provider === 'FACEBOOK' ? this.user.authToken : this.user.idToken,
        social_account: this.user?.provider === 'FACEBOOK' ? environment.SOCIAL_ACCOUNT_FACEBOOK : environment.SOCIAL_ACCOUNT_GOOGLE,
        role: environment.ROLE_APPLIER,
      }
      this.doSignIn(postData);
    }
  }

  //to do basic(email,password) Login.
  doBasicSignIn() {
    let postData = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      rememberMe: this.signInForm.value.rememberMe,
    }
    this.doSignIn(postData);
  }

  //to do Login.calling our Login API.
  doSignIn(postData: any) {
    this.authService.doSignIn(postData).subscribe(
      resData => {
        this.loggedInUser = resData;
        this.isError = false;
        this.errorMessage = "";
        this.signInForm.reset();
        if (this.loggedInUser && this.loggedInUser.user && this.loggedInUser.user.social_account === 0) {
          if (!this.loggedInUser.user.is_verified) {
            localStorage.removeItem('userData');
            this.isError = true;
            const dialogRef = this.dialog.open(ErrorDialog, {
              data: {
                errorMessage: "Bitte bestätige deine Email-Adresse in der dir bereits zugesendeten Willkommens-Mail"
              }
            });
            this.errorMessage = "Bitte bestätige deine Email-Adresse in der dir bereits zugesendeten Willkommens-Mail";
            return;
          }
        }
        if (this.loggedInUser.user.role == environment.ROLE_COMPANY) {
          _paq.push(['setDocumentTitle', document.title]);
          _paq.push(['trackPageView']);
          _paq.push(['trackEvent', 'Company', 'Company Login']);

          if (this.returnUrl) {
          // if (this.authService.previousUrl) {
            window.location.href = this.returnUrl;
            // this.router.navigate([`/${this.returnUrl}`]);
            // this.router.navigate([`/${this.authService.previousUrl}`]);
          } else {
            // this.router.navigate([`/company`]);
            window.location.href = `/company`;
          }
        } else {
          _paq.push(['setDocumentTitle', document.title]);
          _paq.push(['trackPageView']);
          _paq.push(['trackEvent', 'Applier', 'Applier Login']);
          if (!this.loggedInUser.user.completed_profile) {
            this.isRegister = false;
            this.router.navigate(['register'])
          } else {
            if (this.returnUrl) {
              // this.router.navigate([`/${this.returnUrl}`]);
              window.location.href = this.returnUrl
              // this.router.navigateByUrl(this.returnUrl);
              // this.router.navigate([`/${this.authService.previousUrl}`]);
            } else {
              // this.router.navigate([`/dashboard`]);
              window.location.href = `/dashboard`;
            }
          }
        }
      },
      errorMessage => {
        if(errorMessage == "redirect"){
          // this.router.navigate(['register']);
          window.location.href="/register"
          return;
        }


        const dialogRef = this.dialog.open(ErrorDialog, {
          data: {
            errorMessage: errorMessage
          }
        });

        if (errorMessage === "Unable to log in with provided credentials.") {
          // this.dialog.open(ErrorDialog, {});
        } else {
          this.signOut();
          localStorage.removeItem('userData');
          this.isError = true;
          this.isSpinner = true;
          this.errorMessage = errorMessage;
        }
      });
  }

  signOut(): void {
    this.socialAuthService.signOut().then().catch(e => '');
    // this.socialAuthService.signOut().then();
  }

  doCompanyLogin() {
    this.router.navigate(['/login-company'])
  }
}

@Component({
  selector: 'app-dialog-error',
  templateUrl: 'app-dialog-error.html',
})
export class ErrorDialog {
  msg:any
  constructor(private router: Router,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<AuthComponent>) {
      this.msg = data.errorMessage;
    }


  doRegister() {

  }
}
