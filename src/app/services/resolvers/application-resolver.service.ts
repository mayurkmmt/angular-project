import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {JobService} from "../job.service";
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationResolverService implements Resolve<any> {
  constructor(private router: Router,
              private  activatedRoute: ActivatedRoute,
              private jobService: JobService,
              private authService:AuthService) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.authService.previousUrl = window.location.pathname;
    return this.jobService.getJob(+route.params['id']);
  }
}
