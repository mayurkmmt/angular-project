import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from "../../services/profile.service";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeviceDetectorService} from "ngx-device-detector";
import {ApplicantService} from "../../services/applicant.service";
import {AuthService} from "../../services/auth.service";
import {LanguageModel} from "../../models/language.model";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  getUserProfile: any;
  isEditModeEnable = false;
  educationFormGroup: FormGroup;
  public isMobile = false;

  constructor(private deviceService: DeviceDetectorService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private _formBuilder: FormBuilder,
              private profileService: ProfileService,
              private applicantService: ApplicantService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.educationFormGroup = this._formBuilder.group({
      educationCtrl: ['', Validators.required]
    });
    this.getProfile();

  }

  dialogResult = false;
  openDialog(action: string) {
    console.log("opening dialog");
    this.isEditModeEnable = true;
    const dialogRef = this.dialog.open(EditProfileComponent, {
      maxWidth: this.isMobile ? '350px' : 'auto',
      maxHeight: this.isMobile ? '80vh' : '',
      data: {
        action: action,
        userProfile: this.getUserProfile
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog closed");
      this.isEditModeEnable = false;
      this.dialogResult = true;
      setTimeout(() => {
        this.getProfile();
      }, 500);

      console.log(`Dialog result: ${result}`);
    });
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      resData => {
        this.getUserProfile = resData;
        // if(this.dialogResult){
        //   this.dialogResult = false;
        //   console.log("------------------");
        //   console.log(this.getUserProfile);
        //   console.log(resData);
        //   console.log("------------------");
        // }
        if (localStorage.getItem('isLoaded') !== 'yes') {
          localStorage.setItem('isLoaded', 'yes');
          // location.reload();
          this.doInitialUpdate();
        }
      }, error => {
        console.log(error);
      });
  }

  getRatings(ratings: number) {
    switch (ratings) {
      case 1:
        return "Einsteiger";
      case 2:
        return "Profi";
      case 3:
        return "Experte";
    }
  }

  getAdditionalLicense(license: string) {
    switch (license) {
      case 'NO_LICENSE':
        return "Keinen weiteren Führerschein";
      case 'FORKLIFT':
        return "Staplerführerschein";
      case 'CRANE':
        return "Kranführerschein";
      case 'ADR_BASIC':
        return "ADR-Basis";
      case 'ADR_TANK':
        return "ADR-Tank";
      case 'ADR_EXPLOSIVE':
        return "ADR Explosiv";
      case 'ADR_RADIOACTIVE':
        return "ADR-Radioaktiv";
    }
  }

  getVehicleExperience(vehicle: string) {
    switch (vehicle) {
      case "tractor-trailer":
        return "Sattelzug";
      case "solo-vehicle":
        return "Solofahrzeug";
      case "articulated-train":
        return "Gliederzug";
      case "refrigerated-vehicle":
        return "Kühlfahrzeug";
      case "swap-body":
        return "Wechselbrücke";
      case "tanker":
        return "Tankfahrzeug";
      case "heavy-transport":
        return "Schwertransporte";
      case "silo":
        return "Silo";
      case "heavy-transport":
        return "Schwertransporte";
    }
  }

  getShift(shift) {
    switch (shift) {
      case "day":
        return "Tagesschicht";
      case "night":
        return "Nachtschicht";
      case "weekend":
        return "Wochenende";
      case "all":
        return "Wechselschicht";
    }
  }

  getTour(tour) {
    switch (tour) {
      case "local":
        return "Nahverkehr";
      case "national":
        return "Fernverkehr (national)";
      case "international":
        return "Fernverkehr (international)";
    }
  }

  getLanguage(language) {
    switch (language) {
      case "german":
        return "deutsch";
      case "english":
        return "Englisch";
    }
  }

  doInitialUpdate() {
    console.log("doing initial update");
    let shift = [];
    Object.values(this.getUserProfile.shift).forEach(value => {
      // @ts-ignore
      if (value.value == true) {
        // @ts-ignore
        shift.push(value.name);
      }
    });

    let tours = [];
    for (let tour of this.getUserProfile.tours) {
      if (tour.value) {
        tours.push(tour.name);
      }
    }

    let vehicleExperience = [];
    for (let vehicle_experience of this.getUserProfile.vehicle_experience) {
      if (vehicle_experience.value) {
        vehicleExperience.push(vehicle_experience.name);
      }
    }

    let additionalLicense = [];
    for (let additional_license of this.getUserProfile.additional_license) {
      if (additional_license.value) {
        additionalLicense.push(additional_license.name);
      }
    }

    let language = [];
    for (let lan of this.getUserProfile.language) {
      language.push(lan.id);
    }

    let applicantsDrivingDetails: any = {
      id: this.getUserProfile.id,
      first_name: this.getUserProfile.user.first_name,
      last_name: this.getUserProfile.user.last_name,
      birth_year: this.getUserProfile.birth_year,
      email: this.authService.getUserData().email,
      shift: shift,
      tours: tours,
      vehicle_experience: vehicleExperience,
      phone_number: this.getUserProfile.phone_number,
      postcode: this.getUserProfile.postcode,
      distance: this.getUserProfile.distance,
      work_experience: this.getUserProfile.work_experience,
      start_work: this.getUserProfile.start_work,
      license: this.getUserProfile.license,
      language: language,
      professional_license: this.getUserProfile.professional_license,
      is_need_professional_license: this.getUserProfile.professional_license,
      additional_license: additionalLicense
    };

    this.applicantService.updateApplicantsDrivingDetails(applicantsDrivingDetails, this.getUserProfile.id)
      .subscribe((resData) => {
      }, error => {
      });
  }
}
