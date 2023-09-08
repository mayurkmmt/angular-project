import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const token = this.authService.getAuthToken();
    let companyUser = JSON.parse(localStorage.getItem('userData'));
    let userRole = companyUser?.role;
    // if (this.authService.getAuthToken()) {
    //     return true;
    // }
    if (route.data['usertype'] == 'Company' && userRole == 2) {
      this.router.navigate([`/dashboard/`]);
    } else if (route.data['usertype'] == 'Applier' && userRole == 3) {
      this.router.navigate([`/company/`]);
    } else if (companyUser?.role == 2 && companyUser?.completed_profile == false) {
      this.router.navigate(['register']);
    } else if (state.url == '/register' && companyUser) {
      if (companyUser?.email) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['create']);
      }
    } else if (state.url == '/create' && companyUser) {
      if (companyUser?.email) {
        this.router.navigate(['dashboard']);
      }
    } else if (state.url.includes("/dashboard")  && companyUser) {
      if (!companyUser?.email) {
        this.router.navigate(['create']);
      }
    } else if (state.url.includes('/applications')  && companyUser) {
      if (!companyUser?.email) {
        this.router.navigate(['create']);
      }
    } else if (state.url == '/my-profile' && companyUser) {
      if (!companyUser?.email) {
        this.router.navigate(['create']);
      }
    } else if (state.url == '/register-company' && companyUser) {
      this.router.navigate(['company']);
    } else if (!companyUser) {
      if (state.url != '/register') {
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
    }
    return true;
  }
}

// export class RouteCanActivateGuard implements CanActivate {
//     constructor(private _permissions: PermissionsStorageService) {}
//     canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
//       const roles = next.data['roles'] as Array<string>;
//       return this._permissions.checkForAllRolesInArray(roles); // This goes and checks the server for the roles and returns an observable
//     }
//   }
