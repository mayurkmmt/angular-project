import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../message.service";
import {AuthService} from "../auth.service";
import {throwError} from "rxjs";
import { share, finalize } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService
  ) {
  }

  get(url, params = {}) {
    return this.http.get(`${environment.BASE_URL}${url}`, params).pipe(
      catchError(this.handleError)
    );
  }

  getV2(page) {
    let httpOptions = this.authService.getHTTPOption();
    return this.http.get(environment.BASE_URL + `jobs/my-job/?page=${page}`, httpOptions).pipe(share());
  }

  delete(url, httpOptions = {}) {
    return this.http.delete(`${environment.BASE_URL}${url}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getApplicationsOverview(page) {
    let httpOptions = this.authService.getHTTPOption();
    // return this.get(`jobs/my-job/`, httpOptions);
    return this.get(`jobs/my-job/?page=${page}`, httpOptions);
  }

  deleteJob(jobId) {
    let httpOptions = this.authService.getHTTPOption();
    // return this.get(`jobs/my-job/`, httpOptions);
    return this.delete(`api/v1/jobs/job/${jobId}`, httpOptions);
  }

  getJobProfile(id: number) {
    let httpOptions = this.authService.getHTTPOption();
    return this.get(`jobs/my-job/${id}/`, httpOptions);
  }

  readUser(id){
    let httpOptions = this.authService.getHTTPOption();
    return this.get(`match/matching/${id}/mark-match-read/`, httpOptions);
  }

  handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = "An unknown error occurred! "
    return throwError(errorMessage)
  }

}
