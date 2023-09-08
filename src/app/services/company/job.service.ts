import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {throwError} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient,
              private router: Router,
              private  authService: AuthService) {
  }

  /** Generic post method */
  post(url, data, httpOptions = {}) {
    return this.http.post(`${environment.BASE_URL}${url}`, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /** Generic put method */
  put(url, data, httpOptions = {}) {
    return this.http.put(`${environment.BASE_URL}${url}`, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /** Generic get method  */
  get(url, params = {}) {
    return this.http.get(`${environment.BASE_URL}${url}`, params).pipe(
      catchError(this.handleError)
    );
  }

  createJob(postData) {
    let httpOptions = this.authService.getHTTPOption();
    return this.post('jobs/job/', postData, httpOptions);
  }

  getJob(id: number) {
    let httpOptions = this.authService.getHTTPOption();
    return this.get(`jobs/job/${id}/`, httpOptions);
  }

  getJobV2(id: number) {
    let httpOptions = this.authService.getHTTPOption();
    if (httpOptions) {
      return this.get(`match/matching/${id}/`, httpOptions);
    }
  }
  getJobPublic(id: number) {
    return this.get(`jobs/all-job/${id}/`);
  }

  editJob(postData, jobId) {
    let httpOptions = this.authService.getHTTPOption();
    return this.put(`jobs/job/${jobId}/`, postData, httpOptions);
  }

  setCompanyDetails(postData: any) {
    let httpOptions = this.authService.getHTTPOption(true);
    return this.post('account/company/', postData, httpOptions);
  }

  updateCompanyDetails(postData: any, companyId) {
    let httpOptions = this.authService.getHTTPOption(true);
    return this.put(`account/company/${companyId}/`, postData, httpOptions);
  }

  getCompanyDetails() {
    let httpOptions = this.authService.getHTTPOption();
    if(httpOptions){
      return this.get(`account/company/me/`, httpOptions);
    }
  }

  /** Generic method for error handling. */
  public handleError(errorRes: HttpErrorResponse) {
    // Default error message.will update this based on received from backend
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error) {
      Object.keys(errorRes.error).map(function (key) {
        errorMessage = errorRes.error[key];
      });
    }

    if (!errorRes.error) {
      return throwError(errorMessage);
    }

    if (errorRes.error.email) {
      errorMessage = errorRes.error.email[0];
    }

    if (errorRes.error.message) {
      errorMessage = errorRes.error.message;
    }

    if (errorRes.error.non_field_errors) {
      errorMessage = errorRes.error.non_field_errors[0];
    }

    return throwError(errorMessage);
  }


  setInterviewProposal(postData: any, matchId: number) {
    let httpOptions = this.authService.getHTTPOption();
    return this.post(`match/matching/${matchId}/interview/`, postData, httpOptions);
  }

  getInterviewProposal(matchId: number) {
    let httpOptions = this.authService.getHTTPOption();
    if (httpOptions) {
      return this.get(`match/matching/${matchId}/interview/`, httpOptions);
    }
  }

  addSuggestionDate(postData: any, matchId: number, interviewId: number) {
    let httpOptions = this.authService.getHTTPOption();
    // return this.post(`match/matching/${matchId}/interview/`, postData, httpOptions);
    return this.put(`match/matching/${matchId}/interview/${interviewId}/`, postData, httpOptions);
  }

  acceptInterviewProposal(postData: any, matchId: number) {
    let httpOptions = this.authService.getHTTPOption();
    // return this.post(`match/matching/${matchId}/interview/`, postData, httpOptions);
    return this.put(`match/matching/${matchId}/`, postData, httpOptions);
  }

}
