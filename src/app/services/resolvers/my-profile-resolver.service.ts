import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ProfileService} from "../profile.service";
import {JobService} from "../job.service";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class MyProfileResolverService implements Resolve<any> {

  constructor(private profileService: ProfileService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.authService.previousUrl = window.location.pathname;
    return this.profileService.getProfile();
  }

}
