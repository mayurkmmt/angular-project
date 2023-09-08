import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/common/navbar/navbar.component';
// @ts-ignore
import { NgCircleProgressModule } from 'ng-circle-progress';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, registerLocaleData } from "@angular/common";

import { UserMatchComponent } from './components/dashboard/user-match/user-match.component';
import { UserDetailsComponent } from './components/dashboard/user-details/user-details.component';
import { FormComponent,FormErrorDialog } from './components/form/form.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// @ts-ignore
import { DeviceDetectorModule } from 'ngx-device-detector';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsiveModule } from 'ngx-responsive';
import { PersonComponent } from './template/form/person/person.component';
import { EducationComponent } from './template/form/education/education.component';
import { FurtherEducationComponent } from './template/form/further-education/further-education.component';
import { VehicleExperienceComponent } from './template/form/vehicle-experience/vehicle-experience.component';
import { CheckboxComponent } from './template/form/fields/checkbox/checkbox.component';
import { LanguageComponent } from './template/form/language/language.component';
import { WorkExperienceComponent } from './template/form/work-experience/work-experience.component';
import { WorkingShiftsComponent } from './template/form/working-shifts/working-shifts.component';
import { EarliestStartDateComponent } from './template/form/earliest-start-date/earliest-start-date.component';
import { FormNavbarComponent } from './template/form/form-navbar/form-navbar.component';
import { PostcodeComponent } from './template/form/postcode/postcode.component';
import { EmailComponent } from './template/form/email/email.component';
import { CircleProgressComponent } from './template/match-list/circle-progress/circle-progress.component';
import { MessagesComponent } from './template/chat/messages/messages.component';
import { HeaderComponent } from './components/common/header/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ProfileDetailsComponent } from './template/profile/profile-details/profile-details.component';
import { FurtherEducationProfileComponent } from './template/profile/furthereducationprofil/further-education-profile.component';
import { FormHeaderComponent } from './components/common/header/form-header/form-header.component';
import { LanguageprofilComponent } from './template/profile/languageprofil/languageprofil.component';
import { CheckboxprofilComponent } from './template/profile/checkboxprofil/checkboxprofil.component';
import { SkillprofilComponent } from './template/profile/skillprofil/skillprofil.component';
import { EducationprofilComponent } from './template/profile/educationprofil/educationprofil.component';

import { ListItemComponent } from './components/applications/list-item/list-item.component';
import {
  ApplicationDetailsComponent,
  DialogCall
} from './components/applications/application-details/application-details.component';
import { ProcessBarComponent } from './template/application/process-bar/process-bar.component';
import { ProcessActionComponent } from './template/application/process-action/process-action.component';
import { TutorialComponent } from './template/tutorial/tutorial.component';
import { ToursComponent } from './template/form/tours/tours.component';
import { JobComponent } from './components/job/job.component';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { JobsComponent } from './components/jobs/jobs.component';
import { RegisterComponent } from './components/register/register.component';
import { ApplicantService } from "./services/applicant.service";

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { AuthComponent } from './components/auth/auth.component';
import { environment } from "../environments/environment";
import { MatIconModule } from "@angular/material/icon";
import { DriverQualificationComponent } from './template/form/driver-qualification/driver-qualification.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { EditProfileComponent } from './components/my-profile/edit-profile/edit-profile.component';
import { MatDialogModule } from "@angular/material/dialog";
import { DialogComponent, DialogSuccess } from './components/common/dialog/dialog.component';
import { ErrorDialog } from "./components/auth/auth.component";
import { CompanyDashboardComponent,DashboardInfoDialog } from './components/company/company-dashboard/company-dashboard.component';
import { JobProfileComponent } from './components/company/job-profile/job-profile.component';
import { JobListComponent } from './components/company/job-profile/job-list/job-list.component';
import { JobDetailsComponent, InfoDialog } from './components/company/job-profile/job-details/job-details.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './components/auth/reset-password-request/reset-password-request.component';
import { MatBadgeModule } from "@angular/material/badge";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LOCALE_ID } from '@angular/core';
import localeGer from '@angular/common/locales/de';
import {
  CompanyNotFoundWarningDialog,
  CreateJobsComponent
} from './components/company/jobs/create-jobs/create-jobs.component';
import {
  QuestionnaireFormComponent,
  JobCreateSuccessDialog
} from './components/company/jobs/create-jobs/questionnaire-form/questionnaire-form.component';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { JobDisplayComponent } from './components/public/job-display/job-display.component';
import { CompanyRegisterComponent,CRegisterErrorDialog } from './components/company/company-register/company-register.component';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';
import { EditCompanyProfileComponent } from './components/company/company-profile/edit-company-profile/edit-company-profile.component';
import { CompanyLoginComponent ,ErrorDialogForCLogin } from './components/company/company-login/company-login.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { Ng2TelInputModule } from 'ng2-tel-input';
import { JobOverviewComponent } from './components/public/job-overview/job-overview.component';
import { PublicJobDetailsComponent } from './components/public/job-overview/public-job-details/public-job-details.component';
import { PublicJobListComponent } from './components/public/job-overview/public-job-list/public-job-list.component';
import { SeoComponent } from './components/public/seo/seo.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ArrangeInterviewComponent, InfoIntervieDialog } from './components/arrange-interview/arrange-interview.component'
import { StatusBarComponent } from './components/arrange-interview/status-bar/status-bar.component'
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from './components/company/jobs/create-jobs/my-date-formats';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AuthGuard } from './helpers/auth-gaurd';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { NgxInfiniteScrollerModule } from './../app/ngx-infinite-scroller.module';
import {NotfoundComponent} from "./components/public/notfound/notfound.component";
import { MatTableModule } from '@angular/material/table'
import { NotificationComponent } from './components/notification/notification.component';
import { NewsComponent } from './components/company/job-profile/news/news.component';
import {CompanyNotificationsComponent} from "./components/company/notifications/company-notifications.component";
import {ApplierNewsComponent} from "./components/arrange-interview/applier-news/applier-news.component";
import { LastEmployersComponent } from './template/form/last-employers/last-employers.component';
import { StartComponent } from './components/start/start.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ApplierRegistrationComponent } from './components/auth/applier-registration/applier-registration.component';

const googleLoginOptions = {
  scope: 'profile email'
};

registerLocaleData(localeGer, 'de');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserMatchComponent,
    UserDetailsComponent,
    FormComponent,
    DashboardComponent,
    PersonComponent,
    EducationComponent,
    FurtherEducationComponent,
    VehicleExperienceComponent,
    CheckboxComponent,
    LanguageComponent,
    WorkExperienceComponent,
    WorkingShiftsComponent,
    EarliestStartDateComponent,
    FormNavbarComponent,
    PostcodeComponent,
    EmailComponent,
    CircleProgressComponent,
    MessagesComponent,
    HeaderComponent,
    FooterComponent,
    MyProfileComponent,
    ProfileDetailsComponent,
    FurtherEducationProfileComponent,
    FormHeaderComponent,
    LanguageprofilComponent,
    CheckboxprofilComponent,
    SkillprofilComponent,
    EducationprofilComponent,
    ListItemComponent,
    ApplicationDetailsComponent,
    ProcessBarComponent,
    ProcessActionComponent,
    TutorialComponent,
    ToursComponent,
    JobComponent,
    JobsComponent,
    RegisterComponent,
    AuthComponent,
    DriverQualificationComponent,
    ApplicationsComponent,
    EditProfileComponent,
    DialogComponent,
    DialogSuccess,
    DialogCall,
    ErrorDialog,
    CompanyDashboardComponent,
    DashboardInfoDialog,
    JobProfileComponent,
    JobListComponent,
    JobDetailsComponent,
    InfoDialog,
    ResetPasswordComponent,
    ResetPasswordRequestComponent,
    CreateJobsComponent,
    CompanyNotFoundWarningDialog,
    QuestionnaireFormComponent,
    JobCreateSuccessDialog,
    JobDisplayComponent,
    CompanyRegisterComponent,
    CompanyProfileComponent,
    EditCompanyProfileComponent,
    CompanyLoginComponent,
    JobOverviewComponent,
    PublicJobDetailsComponent,
    PublicJobListComponent,
    SeoComponent,
    ArrangeInterviewComponent,
    StatusBarComponent,
    InfoIntervieDialog,
    NotfoundComponent,
    ErrorDialogForCLogin,
    FormErrorDialog,
    CRegisterErrorDialog,
    NotificationComponent,
    NewsComponent,
    CompanyNotificationsComponent,
    ApplierNewsComponent,
    LastEmployersComponent,
    StartComponent,
    ApplierRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatStepperModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    ResponsiveModule.forRoot(),
    MatExpansionModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgCircleProgressModule.forRoot(),
    NgxInfiniteScrollerModule,
    HttpClientModule,
    MatProgressBarModule,
    NgxJsonLdModule,
    CommonModule,
    SocialLoginModule,
    MatIconModule,
    MatDialogModule,
    MatBadgeModule,
    CKEditorModule,
    GooglePlaceModule,
    MatSlideToggleModule,
    MatGridListModule,
    Ng2TelInputModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [
    ApplicantService,
    Title,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GOOGLE_CLIENT_KEY,
              googleLoginOptions
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.FACEBOOK_CLIENT_KEY),
          }
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: LOCALE_ID, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    AuthGuard,
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  ngDoBootstrap(app: any) {

  }
}
