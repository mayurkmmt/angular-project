import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatStepper } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { FormStepperModel, CustomMap } from "../../models/form-stepper.model";
import { environment } from "../../../environments/environment";

import { validateCheckbox } from 'src/app/services/validateCheckbox';
import { LanguageModel } from "../../models/language.model";
import { StepperService } from '../../services/stepper.service';
import { AuthService } from "../../services/auth.service";
import { ApplicantService } from "../../services/applicant.service";
import * as moment from 'moment';
declare var _paq: any;
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input("stepperIndex") stepperIndex: number;
  @ViewChild("stepper", { static: true }) myStepper: MatStepper;

  educationFormGroup: FormGroup;
  driverQualificationFormGroup: FormGroup;
  vehicleExperienceFormGroup: FormGroup;
  furtherEducationFormGroup: FormGroup;
  workExperienceFormGroup: FormGroup;
  lastEmployerFormGroup: FormGroup;
  shiftsFormGroup: FormGroup;
  toursFormGroup: FormGroup;
  startFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  languageFormGroup: FormGroup;
  personFormGroup: FormGroup;
  sentFormGroup: FormGroup;
  public isMobile = false;
  subscriptions: Array<Subscription> = [];
  auth2: any;
  isError = false;
  errorMessage: string = '';
  postApplicantData;
  earliestStartDate: string;
  isLoading = false;
  buttonText = 'Absenden';
  index = 0;
  process = 0;
  hide = true;
  dialCode = '+49';
  isSocialUser = false;
  isSpinner = false;
  isRegister = true;
  userData : any;

  constructor(
    private _formBuilder: FormBuilder,
    public stepperService: StepperService,
    private deviceService: DeviceDetectorService,
    private router: Router,
    private applicantService: ApplicantService,
    private authService: AuthService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {

    let snackBarRef =  this._snackBar.open('Schon einen Account?', 'Zum Login', {
      duration: 7000
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate([`/login`]);
    })

    this.isMobile = this.deviceService.isMobile();

    this.subscriptions.push(
      this.stepperService.index.subscribe((index) => {
        if (this.myStepper.selectedIndex !== index) {
          this.myStepper.selectedIndex = index;
        }
      })
    );

    // begin with the formGroup validations
    this.educationFormGroup = this._formBuilder.group({
      educationCtrl: ['', Validators.required]
    });
    this.driverQualificationFormGroup = this._formBuilder.group({
      driverQualification: ['', Validators.required]
    });
    this.vehicleExperienceFormGroup = this._formBuilder.group({
      "tractor-trailer": false,
      "solo-vehicle": false,
      "articulated-train": false,
      "refrigerated-vehicle": false,
      "swap-body": false,
      "tanker": false,
      "silo": false,
      "heavy-transport": false
    }, {
      validator: (formGroup: FormGroup) => {
        return validateCheckbox(formGroup);
      }
    });
    this.furtherEducationFormGroup = this._formBuilder.group({
      'NO_LICENSE': false,
      'FORKLIFT': false,
      'CRANE': false,
      'ADR_BASIC': false,
      'ADR_TANK': false,
      'ADR_EXPLOSIVE': false,
      'ADR_RADIOACTIVE': false
    }, {
      validator: (formGroup: FormGroup) => {
        return validateCheckbox(formGroup);
      }
    });
    this.workExperienceFormGroup = this._formBuilder.group({
      sliderValue: [0, [Validators.min(0), Validators.max(30)]]
    });
    this.shiftsFormGroup = this._formBuilder.group({
      day: false,
      night: false,
      all: false,
      weekend: false,
    }, {
      validator: (formGroup: FormGroup) => {
        return validateCheckbox(formGroup);
      }
    });
    this.toursFormGroup = this._formBuilder.group({
      local: false,
      national: false,
      international: false,
    }, {
      validator: (formGroup: FormGroup) => {
        return validateCheckbox(formGroup);
      }
    });
    this.startFormGroup = this._formBuilder.group({
      earliestStartDate: [Validators.required] //, ValidateDateService.ptDate
    });
    this.locationFormGroup = this._formBuilder.group({
      sliderValue: [Validators.required, Validators.max(100)],
      postcode: ['', [Validators.required,
      Validators.maxLength(5),
      Validators.pattern('^[0-9]*$')]]
    });
    this.languageFormGroup = this._formBuilder.group({
      german: ['', Validators.pattern('^[0-9]{1}$')],
      english: ['', Validators.pattern('^[0-9]{1}$')]
    });
    this.personFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dial_code: ['', [Validators.required,
      Validators.pattern("^[0-9'+']*$")]],
      phone: ['', [Validators.required,
      Validators.maxLength(15),
      Validators.minLength(10),
      Validators.pattern("^[0-9]*$")]],
      birthYear: ['']
    });
    this.sentFormGroup = this._formBuilder.group({
      dsgvoCtrl: false,
      agbCtrl: false,
    }, {
      validator: (formGroup: FormGroup) => {
        return validateCheckbox(formGroup, 2);
      }
    });

    this.lastEmployerFormGroup = this._formBuilder.group({
      employer_1_year:['',Validators.required],
      employer_1: ['',Validators.required],
      employer_2_year:[''],
      employer_2: [''],
    })

    this.lastEmployerFormGroup.get('employer_2_year').valueChanges.subscribe(val => {
      if (this.lastEmployerFormGroup.get('employer_2_year').value) {
        this.lastEmployerFormGroup.controls['employer_2'].setValidators([Validators.required]);
      } else {
        this.lastEmployerFormGroup.controls['employer_2'].clearValidators();
      }
      this.lastEmployerFormGroup.controls['employer_2'].updateValueAndValidity();
    });

    //end Validations
  }

  ngAfterViewInit() {
    let url = window.location.pathname;
    if (url == '/register2') {
      this.myStepper.next();
      // this.myStepper.selectedIndex = 1;
    }
  }

  /** to add applicant's driving details. */
  submit() {
    this.isLoading = true;
    this.buttonText = '';
    let vehicleExperience = [];
    Object.keys(this.vehicleExperienceFormGroup.controls).forEach(key => {
      if (this.vehicleExperienceFormGroup.get(key).value == true) {
        vehicleExperience.push(key)
      }
    });

    let furtherEducation = [];
    Object.keys(this.furtherEducationFormGroup.controls).forEach(key => {
      if (this.furtherEducationFormGroup.get(key).value == true) {
        furtherEducation.push(key);
      }
    });

    let shift = [];
    Object.keys(this.shiftsFormGroup.controls).forEach(key => {
      if (this.shiftsFormGroup.get(key).value == true) {
        shift.push(key);
      }
    });

    let tours = [];
    Object.keys(this.toursFormGroup.controls).forEach(key => {
      if (this.toursFormGroup.get(key).value == true) {
        tours.push(key);
      }
    });

    let language = [];
    Object.keys(this.languageFormGroup.controls).forEach(key => {
      let languagePK = new LanguageModel().getByNameAndRatings(key, this.languageFormGroup.value[key]);
      if (languagePK) {
        language.push(languagePK);
      }
    });

    // Constructing PostData object for applicant driving details.
    let applicantsDrivingDetails: any = {
      id: "",
      first_name: this.personFormGroup.value.firstName,
      last_name: this.personFormGroup.value.lastName,
      birth_year: this.personFormGroup.value.birthYear,
      // email: this.registrationFormGroup.value.email,
      shift: shift,
      tours: tours,
      vehicle_experience: vehicleExperience,
      phone_number: this.dialCode + this.personFormGroup.value.phone,
      postcode: this.locationFormGroup.value.postcode,
      distance: this.locationFormGroup.value.sliderValue,
      work_experience: this.workExperienceFormGroup.value.sliderValue,
      start_work: this.earliestStartDate,
      license: this.educationFormGroup.value.educationCtrl,
      language: language,
      professional_license: this.driverQualificationFormGroup.value.driverQualification !== "NO",
      is_need_professional_license: this.driverQualificationFormGroup.value.driverQualification !== "NO",
      additional_license: furtherEducation,
      employer_1 : this.lastEmployerFormGroup.value.employer_1,
      employer_2 : this.lastEmployerFormGroup.value.employer_2,
      employer_1_year : this.lastEmployerFormGroup.value.employer_1_year,
      employer_2_year : this.lastEmployerFormGroup.value.employer_2_year ,

    };

    this.authService.addApplicantsDrivingDetails(applicantsDrivingDetails).subscribe((resData:any) => {
      // this.angulartics2Piwik.startTracking();
      // this.angulartics2.eventTrack.next({
      //   action: 'finished questionaries',
      //   properties: { category: 'Applier' },
      // });
      // _paq.push(['trackPageView']);

      _paq.push(['setDocumentTitle', document.title]);
		  _paq.push(['trackEvent', 'Applier', 'finished questionaries']);
      this.isLoading = false;
      this.buttonText = 'Absenden';
      this.router.navigate([`/create`]);
    }, errorMessage => {
      console.log("errorMessage In user-match component");
      console.log(errorMessage);
      const dialogRef = this.dialog.open(FormErrorDialog, {
        data: {
          errorMessage: errorMessage
        }
      });
      this.router.navigate([`/register`]);
    });
  }

  /** Method to get formatted date. */
  public getEarliestStartDate(date: any): void {
    // this.earliestStartDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      let momentToDate = moment(date).toDate();
      const day = (momentToDate || new Date()).getDay();
      this.earliestStartDate = (momentToDate || new Date()).getFullYear() + '-' + ((momentToDate || new Date()).getMonth() + 1) + '-' + (momentToDate || new Date()).getDate();
  }

  public getPhoneNumber(obj: any) {
    if (obj.dialCode) {
      this.dialCode = '+' + obj.dialCode;
    }
  }

  /** Method to updateProfile stepper. */
  public updateStepper($event: StepperSelectionEvent) {
    if (!this.isError) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      const step: number = $event.selectedIndex;
      const map = this.stepperService.state.value;
      if (map[step] == null) {
        map[step] = { active: true, valid: false, disabled: false };
        this.stepperService.state.next(map);
      }
      map[0].valid = true;
      map[1].valid = !this.educationFormGroup.disabled;
      map[2].valid = !this.driverQualificationFormGroup.disabled;
      map[3].valid = !this.vehicleExperienceFormGroup.disabled;
      map[4].valid = !this.furtherEducationFormGroup.disabled;
      map[5].valid = !this.workExperienceFormGroup.disabled;
      map[6].valid = !this.shiftsFormGroup.disabled;
      map[7].valid = !this.toursFormGroup.disabled;
      map[8].valid = !this.startFormGroup.disabled;
      map[9].valid = !this.locationFormGroup.disabled;
      map[10].valid = !this.languageFormGroup.disabled;
      map[11].valid = !this.personFormGroup.disabled;
      map[12].valid = !this.sentFormGroup.disabled;
      map[0].disabled = false;
      this.index = this.stepperService.index.value;
      this.process = this.index * 100 / 14;
      if (this.stepperService.index.value !== $event.selectedIndex) {
        let newIndex = this.stepperService.index.value;
        let customMsg = ($event.selectedIndex <= 12) ? 'Signup Step : ' + newIndex : 'finished questionaries';
        if(newIndex == 0 && this.isSocialUser == false){
          _paq.push(['setDocumentTitle', document.title]);
          _paq.push(['trackPageView']);
        }
        _paq.push(['trackEvent', 'Applier', customMsg]);

        map[step].active = true;
        map[step].disabled = false;
        this.stepperService.state.next(map);
        this.stepperService.index.next($event.selectedIndex);
      }
      this.isSpinner = false;
    }
  }

  /** Method to reset stepper. */
  resetStepper() {
    this.stepperService.index = new BehaviorSubject<number>(0);
    const map: CustomMap<FormStepperModel> = new CustomMap();
    for (let i = 0; i < 15; i++) {
      map[i] = { active: false, valid: false, disabled: true }
    }
    this.stepperService.state = new BehaviorSubject<CustomMap<FormStepperModel>>(map);
  }

  scrollTop() {
    let element = document.getElementById("accordion");
    element.scrollIntoView({
      behavior: 'smooth'
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}

@Component({
  selector: 'app-dialog-error',
  templateUrl: 'app-dialog-error.html',
})
export class FormErrorDialog {
  msg:any
  constructor(private router: Router,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<FormComponent>) {
      this.msg = data.errorMessage;
    }


  doRegister() {

  }
}
