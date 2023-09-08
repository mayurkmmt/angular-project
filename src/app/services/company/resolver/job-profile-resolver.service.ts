import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {DashboardService} from "../dashboard.service";
import {AuthService} from "../../auth.service";

@Injectable({
  providedIn: 'root'
})
export class JobProfileResolverService {
  constructor(private dashboardService: DashboardService,
              private authService:AuthService) { }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.authService.previousUrl = window.location.pathname;
    return this.dashboardService.getJobProfile(+route.params['id']);
  }
}
