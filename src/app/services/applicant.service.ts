import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

import {environment} from "../../environments/environment";
import {ApplicantRegistrationModel} from "../models/applicant-registration.model";
import {AuthService} from "./auth.service";

export interface AuthResponseData {
  detail: {
    first_name?: string;
    last_name?: string;
    email: string;
    role: number;
  }
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApplicantService {

  applicant = new BehaviorSubject<ApplicantRegistrationModel>(null);

  /** Here we injecting other services which we will used in this service. */
  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) {
  }

  /** Generic post method for all applicant's APIs. */
  post(url, data, httpOptions = {}) {
    return this.http.post(`${environment.BASE_URL}${url}`, data, httpOptions).pipe(
      catchError(this.authService.handleError),
      //DO NOTHING FOR NOW. WILL HANDLE THIS LATER IF REQUIRED
    );
  }

  /** Generic put method for all applicant's APIs. */
  put(url, data, httpOptions = {}) {
    return this.http.put(`${environment.BASE_URL}${url}`, data, httpOptions).pipe(
      catchError(this.authService.handleError),
      //DO NOTHING FOR NOW. WILL HANDLE THIS LATER IF REQUIRED
    );
  }

  /** Adding applicant driving details. */
  addApplicantsDrivingDetails(applicantsDrivingDetails) {
    return this.post('account/applier/', applicantsDrivingDetails);
  }

  /** Updating applicant driving details. */
  updateApplicantsDrivingDetails(applicantsDrivingDetails, id) {
    let httpOptions = this.authService.getHTTPOption();
    return this.put(`account/applier/${id}/`,
      applicantsDrivingDetails,
      httpOptions);
  }

  doUpdateStatus(data: any, jobId: number) {
    let httpOptions = this.authService.getHTTPOption();
    return this.put(`match/matching/${jobId}/`, data, httpOptions);
  }

}
