import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceDetectorService} from "ngx-device-detector";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  public isMobile = false;
  isError = false;
  errorMessage: string;
  successMessage: string;
  uId: string;
  token: string;

  constructor(
    private _formBuilder: FormBuilder,
    private deviceService: DeviceDetectorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.uId = params['uid'];
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.resetPasswordForm = this._formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(128)]],
      confirm_password: ['', [Validators.required, Validators.maxLength(128)]]
    }, {
      validators: this.ConfirmPassword('password', 'confirm_password')
    });
    this.authService.doVerifyResetPasswordToken(this.uId, this.token).subscribe(resData => {
    }, error => {
      console.log("Error occur!");
      console.log(error);
      this.isError = true;
      this.errorMessage =  "Ihr Link ist abgelaufen. Bitte versuchen Sie es nach einiger Zeit erneut.";
    })
  }

  resetPassword() {
    let data = {
      password1: this.resetPasswordForm.value.password,
      password2: this.resetPasswordForm.value.confirm_password
    }
    this.authService.doResetPassword(data, this.uId, this.token).subscribe(
      resData => {
        this.isError = false;
        this.errorMessage =  "";
        this.resetPasswordForm.reset();
        this.router.navigate(['/login']);
      }, error => {
        console.log("ERROR");
        console.log(error);
        this.isError = true;
        this.errorMessage =  "Etwas ist schief gelaufen. Bitte versuchen Sie es nach einiger Zeit erneut.";
      })

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
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
