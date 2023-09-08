import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {ApplicantRegistrationModel} from "../models/applicant-registration.model";
import {environment} from "../../environments/environment";
import {MatDialogRef} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  applicant = new BehaviorSubject<ApplicantRegistrationModel>(null);
  previousUrl: string;
  rememberMe = false;

  /** Here we injecting other services which we will used in this service. */
  constructor(private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  /** Generic post method for Auth related APIs. */
  post(url, data, httpOptions = {}) {
    return this.http.post(`${environment.BASE_URL}${url}`, data, httpOptions).pipe(
      catchError(this.handleError),
      tap(resData => {
        if (resData) {
          this.handleAuthentication(
            resData
          );
        }
      })
    );
  }

  put(url, data, httpOptions = {}) {
    return this.http.put(`${environment.BASE_URL}${url}`, data, httpOptions).pipe(
      catchError(this.handleError),
      tap(resData => {
        if (resData) {
          this.handleAuthentication(
            resData
          );
        }
      })
    );
  }

  get(url, params = {}) {
    return this.http.get(`${environment.BASE_URL}${url}`, params).pipe(
      catchError(this.handleError)
    );
  }

  /** method to do basic registration. */
  signUp(applicant: ApplicantRegistrationModel[]) {
    return this.post('account/create/', applicant);
  }

  /** method to do basic registration. */
  updateAccount(userId,postData) {
    let httpOptions = this.getHTTPOption();
    return this.put(`account/update/${userId}/`,postData,httpOptions);
  }

  /** method to do social registration. */
  //TODO: Unused. remove after checking usage
  socialSignUp(applicant: ApplicantRegistrationModel[]) {
    return this.post('account/social-registration/', applicant);
  }

  doSocialRegistration(userId,postData){
    let httpOptions = this.getHTTPOption();
    return this.put(`account/social-registration/${userId}/`,postData,httpOptions);
  }



  /** method to do Login/SignIn. */
  doSignIn(postData) {
    if (postData.rememberMe) {
      this.rememberMe = true;
    }
    return this.post('account/api-token-auth/', postData);
  }

  /** method to do Request for reset password */
  doResetPasswordRequest(postData) {
    return this.post('account/reset-password-request/', postData);
  }

  /** method to do reset password */
  doVerifyResetPasswordToken(uId: string, token: string) {
    return this.get(`/account/token-verify/${uId}-${token}/`);
  }

  /** method to do reset password */
  doResetPassword(postData, uId: string, token: string) {
    return this.post(`account/reset_password_confirm/${uId}-${token}/`, postData);
  }

  addApplicantsDrivingDetails(applicantsDrivingDetails) {
    // return this.post('account/applier/', applicantsDrivingDetails);
    return this.post('account/applier-register/', applicantsDrivingDetails);
  }

  /** Generic method to handle success response for all auth related APIs. */
  public handleAuthentication(
    resData
  ) {
    let expiresIn = 3600;
    //We are configuring expiration time to 1 day
    let expirationTime = new Date().getTime() + 24 * expiresIn * 1000;
    if (resData.user) {
      let applicantData;
      // applicantData.email = resData?.user.email ;

      // localStorage.setItem("userData",JSON.stringify(applicantData));
      applicantData = {
        id: resData?.user.id,
        email: resData?.user.email,
        first_name: resData?.user.first_name,
        last_name: resData?.user.last_name,
        completed_profile: resData?.user.completed_profile,
        role: resData?.user.role,
        token: 'Token ' + resData?.token,
        social_account: resData?.social_account ? resData?.social_account[0] : null
      };

      if (!this.rememberMe) {
        applicantData = {...applicantData, expiresIn: expirationTime}
        this.autoLogout(24 * expiresIn * 1000);
      }
      localStorage.setItem('userData', JSON.stringify(applicantData));
      this.applicant.next(applicantData);
    }
  }

  /** Generic method for error handling. */
  public handleError(errorRes: HttpErrorResponse) {
    // Default error message.will update this based on received from backend
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error) {
      return throwError(errorMessage);
    }

    if (errorRes.error.redirect) {
      if(errorRes.error.redirect[0] == "True") {
        errorMessage = "redirect";
        return throwError(errorMessage);
      }
    }

    if (errorRes.error.email) {
      errorMessage = errorRes.error.email[0];
    }

    if (errorRes.error.non_field_errors) {
      errorMessage = errorRes.error.non_field_errors[0];
    }

    return throwError(errorMessage);
  }

  /** it will remove user details from browser storage whenever user want to logout from account. */
  logout() {
    this.applicant.next(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoaded');
    this.router.navigate(['/login']);
    setTimeout(() => {
      // window.location.reload();
      this.router.navigate(['/login']);
    }, 1000);
    // this.router.navigate(['/login']);
  }

  companyLogout() {
    // this.applicant.next(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoaded');
    this.router.navigate(['/login-company']);
    setTimeout(() => {
      this.router.navigate(['/login-company']);
      // window.location.reload();
    }, 1000);
  }

  /** it will remove user details from browser storage after expiration time. */
  autoLogout(expirationDuration: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  /** it will get Auth token stored in browser storage. */
  getAuthToken() {
    let localData = this.getUserData();
    if (localData) {
      return localData.token;
    }
    this.router.navigate(['/login']);
  }

  /** It will get HTTP option required while calling API */
  getHTTPOption(isMultiPartForm = false) {
    const token = this.getAuthToken();
    let headers_object;
    if (token) {
      if (isMultiPartForm) {
        headers_object = new HttpHeaders({
          'Authorization': token,
          "Accept": "application/json"
          // "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
        });
      } else {
        headers_object = new HttpHeaders({
          'Authorization': token
        });
      }

      return {
        headers: headers_object
      };
    }

    return null;

  }

  getUserData() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      let expireTime = userData.expiresIn;
      if (new Date().getTime() > expireTime) {
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      }
      return userData;
    }
    let url = window.location.href;

    //TODO:replace below flow with authGuard.
    let isRegister = url.substring(url.lastIndexOf('/') + 1) === 'register';
    // let isResetPasswordRequest = url.substring(url.lastIndexOf('/') + 1) === 'reset-password';
    let isResetPasswordUrl = url.includes('reset-password')
    let isPublicUrl = url.includes('public')
    let isCompanyLogin = url.includes('company-login')
    if (!isRegister && !isResetPasswordUrl && !isPublicUrl && isCompanyLogin) {
      this.router.navigate(['/login']);
    }
  }

}
