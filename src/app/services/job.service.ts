import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {JobModel} from "../models/job.model";
import {MessageService} from './message.service';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class JobService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) {
  }

  get(url, params = {}) {
    return this.http.get(`${environment.BASE_URL}${url}`, params).pipe(
      catchError(this.handleError)
    );
  }

  getJobs(status: number,page: number = 1) {
    let httpOptions = this.authService.getHTTPOption();
    return this.get(`match/matching/?status=${status}&page=${page}`, httpOptions);
    // return this.get(`match/matching/?status=${status},5,4`, httpOptions);
  }
  getJobsForApplication(status: number) {
    let httpOptions = this.authService.getHTTPOption();
    return this.get(`match/matching/?status=${status},3,4,5,6,7,8,9,11,41,42,43`, httpOptions);
    // return this.get(`match/matching/?status=${status},3,4,5,6,7,8,9,11,41,42,43&page=2`, httpOptions);
  }

  getJob(id: number) {
    let httpOptions = this.authService.getHTTPOption();
    if (httpOptions) {
      return this.get(`match/matching/${id}/`, httpOptions);
    }
  }

  publicGetAllJob(param = '') {
    if (param.length > 0) {
      return this.get(`jobs/all-job-json/` + param);
    } else {
      return this.get(`jobs/all-job-json/`);
    }
    // return this.get(`http://45.79.248.86:8000/api/v1/jobs/all-job-json/?page=2`);
  }

  publicGetJobDetails(id: number) {
    return this.get(`jobs/all-job/${id}/`);
  }

  handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = "An unknown error occurred!"
    if (errorRes.error) {
      Object.keys(errorRes.error).map(function (key) {
        errorMessage = errorRes.error[key];
      });
    }
    return throwError(errorMessage);
  }
}
