import { Component, OnInit } from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {environment} from "../../../../environments/environment";
import {FormErrorDialog} from "../../form/form.component";
import {DeviceDetectorService} from "ngx-device-detector";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ApplicantService} from "../../../services/applicant.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-applier-registration',
  templateUrl: './applier-registration.component.html',
  styleUrls: ['./applier-registration.component.scss']
})
export class ApplierRegistrationComponent implements OnInit {

  registrationFormGroup: FormGroup;
  isMobile = false;
  isSpinner = false;
  isSocialUser = false;
  hide = true;
  hideConfirmPassword = true;
  postApplicantData;
  isError = false;
  errorMessage = "";
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private deviceService: DeviceDetectorService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.initForm();
    let url = window.location.pathname;

    //Initializing social-x auth
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (url == '/create') {

        // console.log("calling doSocialSignUp()", this.stepperIndex);
        this.doSocialSignIn();
        // this.doSocialSignUp();
      }
    });
  }

  initForm(){
    this.registrationFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      password: ['', [Validators.required, Validators.maxLength(128)]],
      confirm_password: ['', [Validators.required, Validators.maxLength(128)]]
    }, {
      validators: this.ConfirmPassword('password', 'confirm_password')
    });
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
      this.doSocialRegistration(postData);
    }
  }

  doSocialRegistration(postData) {
    let userId = this.authService.getUserData().id;

    this.authService.doSocialRegistration(userId,postData).subscribe(
      resData => {
        this.isSpinner = false;
        this.isError = false;
        this.errorMessage = "";
        this.router.navigate([`/tutorial`]);

      },
      errorMessage => {
        const dialogRef = this.dialog.open(FormErrorDialog, {
          data: {
            errorMessage: errorMessage
          }
        });
        console.log(errorMessage + "  ==> errorMessage")
        if (errorMessage === "Unable to log in with provided credentials.") {
          // this.dialog.open(FormErrorDialog, {});
        } else{
          // this.signOut();
          // localStorage.removeItem('userData');
          this.isError = true;
          this.isSpinner = true;
          this.errorMessage = errorMessage;
        }
      });
  }


  doSignUp() {
    this.isSpinner = true;
    this.isSocialUser = false;
    let userId = this.authService.getUserData().id;
    this.postApplicantData = {...this.registrationFormGroup.value,
      role : environment.ROLE_APPLIER,id : userId};
    // this.authService.signUp(this.postApplicantData).subscribe(
    this.authService.updateAccount(userId,this.postApplicantData).subscribe(
      resData => {
        this.isSpinner = false;
        this.isError = false;
        this.errorMessage = "";
        this.router.navigate([`/tutorial`]);
      },
      errorMessage => {
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoaded');
        const dialogRef = this.dialog.open(FormErrorDialog, {
          data: {
            errorMessage: errorMessage
          }
        });


        dialogRef.afterClosed().subscribe(() => {
          window.location.href = `/login`;
        });

        this.isSpinner = false;
        this.isError = true;
        this.errorMessage = errorMessage;

      });
  }

  ConfirmPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  scrollTop() {
    let element = document.getElementById("accordion");
    element.scrollIntoView({
      behavior: 'smooth'
    });
  }



}
