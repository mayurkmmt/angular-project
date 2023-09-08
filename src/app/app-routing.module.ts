import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FormComponent} from './components/form/form.component';
import {TutorialComponent} from './template/tutorial/tutorial.component';
import {JobComponent} from './components/job/job.component';
import {JobsComponent} from './components/jobs/jobs.component';
import {ProfileDetailsComponent} from './template/profile/profile-details/profile-details.component';
import {AuthComponent} from "./components/auth/auth.component";
import {ApplicationsComponent} from "./components/applications/applications.component";
import {ApplicationResolverService} from "./services/resolvers/application-resolver.service";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {MyProfileResolverService} from "./services/resolvers/my-profile-resolver.service";
import {CompanyDashboardComponent} from "./components/company/company-dashboard/company-dashboard.component";
import {JobProfileComponent} from "./components/company/job-profile/job-profile.component";
import {JobProfileResolverService} from "./services/company/resolver/job-profile-resolver.service";
import {NavbarComponent} from "./components/common/navbar/navbar.component";
import {ResetPasswordComponent} from "./components/auth/reset-password/reset-password.component";
import {ResetPasswordRequestComponent} from "./components/auth/reset-password-request/reset-password-request.component";
import {CreateJobsComponent} from "./components/company/jobs/create-jobs/create-jobs.component";
import {JobDisplayComponent} from "./components/public/job-display/job-display.component";
import {CompanyRegisterComponent} from "./components/company/company-register/company-register.component";
import {CompanyProfileComponent} from "./components/company/company-profile/company-profile.component";
import {EditCompanyProfileComponent} from "./components/company/company-profile/edit-company-profile/edit-company-profile.component";
import {CompanyLoginComponent} from "./components/company/company-login/company-login.component";
import {JobOverviewComponent} from "./components/public/job-overview/job-overview.component";
import {NotfoundComponent} from "./components/public/notfound/notfound.component";
import {NotificationComponent} from "./components/notification/notification.component";
import {CompanyNotificationsComponent} from "./components/company/notifications/company-notifications.component";
import {AuthGuard} from './helpers/auth-gaurd';
import {StartComponent} from "./components/start/start.component";
import {ApplierRegistrationComponent} from "./components/auth/applier-registration/applier-registration.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: AuthComponent, data: {title: 'Anmeldung'}},
  {path: 'logout', component: AuthComponent, data: {title: 'Anmeldung'}},
  {path: 'start', component: StartComponent, data: {title: 'Job finden'}},
  {path: 'register', component: FormComponent, canActivate: [AuthGuard], data: {title: 'Registrieren'}},
  {path: 'create', component: ApplierRegistrationComponent,canActivate: [AuthGuard], data: {title: 'Account fertigstellen'}},
  {path: 'register2', component: FormComponent, data: {title: 'Registrieren'}},
  {path: 'reset-password-request', component: ResetPasswordRequestComponent, data: {title: 'Passwort zurücksetzen'}},
  {path: 'reset-password', component: ResetPasswordComponent, data: {title: 'Passwort zurücksetzen'}},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Dashboard', usertype: 'Applier'}},
  {path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Dashboard', usertype: 'Applier'}},
  // { path: 'dashboard/:id', component: DashboardComponent ,data: {title: 'Instrumententafel'}},
  {path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard], data: {title: 'Bewerbungen', usertype: 'Applier'}},
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard],
    data: {title: 'Benachrichtigungen', usertype: 'Applier'}
  },
  {
    path: 'applications/:id', component: ApplicationsComponent, canActivate: [AuthGuard],
    resolve: {
      applicationResolver: ApplicationResolverService
    }, data: {title: 'Bewerbungen', usertype: 'Applier'}
  },
  {
    path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard],
    resolve: {
      myProfileResolver: MyProfileResolverService
    }, data: {title: 'Mein Profil', usertype: 'Applier'}
  },
  {path: 'tutorial', component: TutorialComponent, data: {title: 'Tutorial'}},
  {path: 'jobs', component: JobsComponent, data: {title: 'Jobs'}},
  {path: 'company', component: CompanyDashboardComponent, canActivate: [AuthGuard], data: {title: 'Dashboard', usertype: 'Company'}},
  // { path: 'company', component: CompanyDashboardComponent ,data: {title: 'Instrumententafel'}},
  {path: 'job/create', component: CreateJobsComponent, canActivate: [AuthGuard], data: {title: 'Job erstellen', usertype: 'Company'}},
  {path: 'job/:id', component: CreateJobsComponent, canActivate: [AuthGuard], data: {title: 'Jobs', usertype: 'Company'}},
  {
    path: 'job-profile/chat/:id/:applierId', component: JobProfileComponent, canActivate: [AuthGuard], resolve: {
      jobProfileResolver: JobProfileResolverService
    }, data: {title: 'Mein Profil', usertype: 'Company'}
  },
  {
    path: 'job-profile/:id/:applierId', component: JobProfileComponent, canActivate: [AuthGuard], resolve: {
      jobProfileResolver: JobProfileResolverService
    }, data: {title: 'Kandidaten', usertype: 'Company'}
  },
  {
    path: 'register-company',
    component: CompanyRegisterComponent,
    data: {title: 'Registrieren', usertype: 'Company'}
  },
  {
    path: 'company-profile',
    component: EditCompanyProfileComponent,
    canActivate: [AuthGuard],
    data: {title: 'Profil erstellen', usertype: 'Company'}
  },
  // TODO: Remove below route/line after testing
  {
    path: 'company-profile/:id',
    component: EditCompanyProfileComponent,
    canActivate: [AuthGuard],
    data: {title: 'Profil erstellen', usertype: 'Company'}
  },
  // { path: 'public/job/:id', component: JobDisplayComponent ,data: {title: 'Jobs'}},
  {path: 'public/job/:id', component: JobOverviewComponent, data: {title: 'Jobs'}},
  {path: 'not-found', component: NotfoundComponent, data: {title: 'not found'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
      anchorScrolling: "enabled",
      onSameUrlNavigation: "reload",
      enableTracing: false,
    })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

