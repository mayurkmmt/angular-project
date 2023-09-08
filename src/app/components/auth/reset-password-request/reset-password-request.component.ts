import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceDetectorService} from "ngx-device-detector";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent implements OnInit {

  resetPasswordRequestForm: FormGroup;
  public isMobile = false;
  isError = false;
  errorMessage: string;
  successMessage: string;

  constructor(private deviceService: DeviceDetectorService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();

    this.resetPasswordRequestForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  sendRequest() {
    let data = {
      email: this.resetPasswordRequestForm.value.email
    }

    this.authService.doResetPasswordRequest(data).subscribe(
      resData => {
        this.errorMessage = '';
        this.successMessage = "Der Link zum Zurücksetzen des Passworts wurde erfolgreich an deine E-Mail gesendet."
        this.isError = false;
        this.resetPasswordRequestForm.reset();
      }, err => {
        console.log("===== ERROR =====");
        console.log(err);
        this.errorMessage = err;
        this.successMessage = '';
        this.isError = true;
      });
  }
}
