import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { validateCheckbox } from "../../../services/validateCheckbox";
import { environment } from "../../../../environments/environment";
import { LanguageModel } from "../../../models/language.model";
import { AuthService } from "../../../services/auth.service";
import { ApplicantService } from "../../../services/applicant.service";
import { Router } from "@angular/router";
import * as moment from 'moment';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  educationFormGroup: FormGroup;
  driverQualificationFormGroup: FormGroup;
  vehicleExperienceFormGroup: FormGroup;
  furtherEducationFormGroup: FormGroup;
  workExperienceFormGroup: FormGroup;
  shiftsFormGroup: FormGroup;
  toursFormGroup: FormGroup;
  startFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  languageFormGroup: FormGroup;
  personFormGroup: FormGroup;
  employerFormGroup: FormGroup;

  userProfile: any;
  action: string;
  earliestStartDate: any;
  updatedStartDate: any;
  languageObj = {};
  distance: number;
  languageKey = { german: '', english: '' };
  selectedBirthYear: number;
  @Output() resData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService,
    private applicantService: ApplicantService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.action = data.action;
    this.userProfile = data.userProfile;
  }

  ngOnInit(): void {
    console.log("init edit profile");
    this.educationFormGroup = this._formBuilder.group({
      educationCtrl: [this.userProfile.license, Validators.required]
    });

    this.driverQualificationFormGroup = this._formBuilder.group({
      // driverQualification: [this.userProfile.is_need_professional_license ? 'YES' : 'NO', Validators.required]
      driverQualification: [this.userProfile.professional_license ? 'YES' : 'NO', Validators.required]
    });

    let vehicleExperienceObj = this.arrayToObject(this.userProfile.vehicle_experience);
    this.vehicleExperienceFormGroup = this._formBuilder.group(vehicleExperienceObj, {
      validator: (formGroup: FormGroup) => {
        return validateCheckbox(formGroup);
      }
    });

    let additionalLicenseObj = this.arrayToObject(this.userProfile.additional_license);
    this.furtherEducationFormGroup = this._formBuilder.group(additionalLicenseObj, {
      validator: (formGroup: FormGroup) => {
        return validateCheckbox(formGroup);
      }
    });

    this.workExperienceFormGroup = this._formBuilder.group({
      sliderValue: [this.userProfile.work_experience, Validators.required]
    });

    let shiftsObj = this.arrayToObject(this.userProfile.shift);
    this.shiftsFormGroup = this._formBuilder.group(shiftsObj, {
      validator: (formGroup: FormGroup) => {
        return validateCheckbox(formGroup);
      }
    });

    let toursObj = this.arrayToObject(this.userProfile.tours);
    this.toursFormGroup = this._formBuilder.group(toursObj, {
      validator: (formGroup: FormGroup) => {
        return validateCheckbox(formGroup);
      }
    });

    this.earliestStartDate = new Date(this.userProfile.start_work);

    // this.earliestStartDate = this.userProfile.start_work;
    this.startFormGroup = this._formBuilder.group({
      earliestStartDate: [this.userProfile.start_work, Validators.required] //, ValidateDateService.ptDate
    });

    this.distance = this.userProfile.distance
    this.locationFormGroup = this._formBuilder.group({
      sliderValue: [this.userProfile.distance, Validators.required],
      postcode: [this.userProfile.postcode, [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });

    let languages = [{ name: "german", rating: 0, id: 1 }, { name: "english", rating: 0, id: 3 }];
    languages.map((language, index) => {
      for (let lan of this.userProfile.language) {
        if (language.name === lan.name) {
          this.languageObj[lan.name] = lan.rating;
          this.languageKey[lan.name] = lan.rating;
          break;
        } else {
          if (!this.languageObj.hasOwnProperty(language.name)) {
            this.languageObj[language.name] = language.rating;
          }
          if (!this.languageKey.hasOwnProperty(language.name)) {
            this.languageKey[language.name] = '';
          }
        }
      }
    });

    this.languageFormGroup = this._formBuilder.group({
      german: [this.languageKey.german, Validators.pattern('^[0-9]{1}$')],
      english: [this.languageKey.english, Validators.pattern('^[0-9]{1}$')]
    });

    this.personFormGroup = this._formBuilder.group({
      firstName: [this.userProfile.user.first_name],
      lastName: [this.userProfile.user.last_name],
      phone: [this.userProfile.phone_number, [Validators.required,
      Validators.minLength(10),
      ]],
      birthYear: [this.userProfile.birth_year]
    });
    this.selectedBirthYear = this.userProfile.birth_year;
    this.personFormGroup.patchValue({
      firstName: this.userProfile.user.first_name,
      lastName: this.userProfile.user.last_name,
      phone: this.userProfile.phone_number,
      birthYear: this.userProfile.birth_year
    });

    this.employerFormGroup = this._formBuilder.group({
      employer_1 : this.userProfile.employer_1,
      employer_2 : this.userProfile.employer_2,
      employer_1_year : this.userProfile.employer_1_year,
      employer_2_year : this.userProfile.employer_2_year
    })

  }

  updateProfile() {
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

    let vehicleExperience = [];
    Object.keys(this.vehicleExperienceFormGroup.controls).forEach(key => {
      if (this.vehicleExperienceFormGroup.get(key).value == true) {
        vehicleExperience.push(key);
      }
    });

    let language = [];
    Object.keys(this.languageFormGroup.controls).forEach(key => {
      if (this.languageFormGroup.value[key]) {
        let languagePK = new LanguageModel().getByNameAndRatings(key, this.languageFormGroup.value[key]);
        language.push(languagePK);
      }
    });

    let furtherEducation = [];
    Object.keys(this.furtherEducationFormGroup.controls).forEach(key => {
      if (this.furtherEducationFormGroup.get(key).value == true) {
        furtherEducation.push(key);
      }
    });

    if (!this.updatedStartDate) {
      this.getEarliestStartDate(new Date(this.startFormGroup.value.earliestStartDate));
    }

    let applicantsDrivingDetails: any = {
      id: this.userProfile.id,
      first_name: this.personFormGroup.value.firstName,
      last_name: this.personFormGroup.value.lastName,
      birth_year: this.personFormGroup.value.birthYear,
      email: this.authService.getUserData().email,
      shift: shift,
      tours: tours,
      vehicle_experience: vehicleExperience,
      phone_number: this.personFormGroup.value.phone,
      postcode: this.locationFormGroup.value.postcode,
      distance: this.locationFormGroup.value.sliderValue,
      work_experience: this.workExperienceFormGroup.value.sliderValue,
      start_work: this.updatedStartDate,
      license: this.educationFormGroup.value.educationCtrl,
      language: language,
      professional_license: this.driverQualificationFormGroup.value.driverQualification !== "NO",
      additional_license: furtherEducation,
      employer_1 : this.employerFormGroup.value.employer_1,
      employer_2 : this.employerFormGroup.value.employer_2,
      employer_1_year : this.employerFormGroup.value.employer_1_year,
      employer_2_year : this.employerFormGroup.value.employer_2_year
    };

    this.applicantService.updateApplicantsDrivingDetails(applicantsDrivingDetails, this.userProfile.id)
      .subscribe((resData) => {
        console.log("profile is updated now and closing dialog");
        // this.router.navigate(['/my-profile']);
      }, error => {

      });
  }

  //Method to get formatted date.

  public getEarliestStartDate(date: any): void {
    // OLD COde
    // this.updatedStartDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    //  New Code
    let momentToDate = moment(date).toDate();
    this.updatedStartDate = (momentToDate || new Date()).getFullYear() + '-' + ((momentToDate || new Date()).getMonth() + 1) + '-' + (momentToDate || new Date()).getDate();
  }


  arrayToObject(array) {
    return array.reduce((obj, item) => {
      obj[item.name] = item.value;
      return obj
    }, {});
  }
}
