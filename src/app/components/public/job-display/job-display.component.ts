import {Component, Input, OnInit} from '@angular/core';
import {JobService} from "../../../services/company/job.service";
import {ActivatedRoute} from "@angular/router";
import {LanguageModel} from "../../../models/language.model";

@Component({
  selector: 'app-job-display',
  templateUrl: './job-display.component.html',
  styleUrls: ['./job-display.component.scss']
})
export class JobDisplayComponent implements OnInit {

  @Input('jobId') jobId: number;
  // jobId: number;
  jobDetails:any;

  tours = "string";
  vehicle_experience = "string";
  shift = "string";
  driver_licence = "string";
  language_skill_german = "string";
  additional_license = "string";
  work_experience = "string";
  language_skills_german = "string";
  experience = "string";
  will_be_transported = "string";
  you_concrete_tasks = "string";
  advantages_of_the_company = "string";

  constructor(private activatedRoute: ActivatedRoute,
              private jobService: JobService) {
  }

  ngOnInit(): void {


    // this.activatedRoute.params.subscribe(params => {
    //   if (params['id']) {
    //     this.jobId = +params['id'];
    //     if (this.jobId) {
    //       this.jobService.getJobPublic(this.jobId).subscribe(resData => {
    //         this.jobDetails = resData;
    //         this.additional_license = this.getAdditionalLicense(this.jobDetails.additional_license);
    //         this.vehicle_experience = this.getVehicleTypeExperience(this.jobDetails.vehicle_experience);
    //         for (let lan of this.jobDetails.language) {
    //           if (lan.name.includes('german')) {
    //             this.language_skill_german = this.getLanguageSkill(lan.id);
    //           }
    //         }
    //       }, error => {
    //         console.log("Error in getJob Public API");
    //         console.log(error);
    //       });
    //     }
    //   }
    // });
  }

  getLanguageSkill(languagePk) {
    return new LanguageModel().getLanguageSkill(parseInt(languagePk));
  }

  getAdditionalLicense(additionalLicense) {
    let translatedAdditionalLicense = [];
    additionalLicense.forEach(license => {
      if (license == "NO_LICENSE") {
        translatedAdditionalLicense.push('Keinen weiteren Führerschein');
      } else if (license == "FORKLIFT") {
        translatedAdditionalLicense.push("Staplerführerschein");
      } else if (license == "CRANE") {
        translatedAdditionalLicense.push("Kranführerschein");
      } else if (license == "ADR_BASIC") {
        translatedAdditionalLicense.push("ADR-Basis");
      } else if (license == "ADR_TANK") {
        translatedAdditionalLicense.push("ADR-Tank");
      } else if (license == "ADR_EXPLOSIVE") {
        translatedAdditionalLicense.push("ADR Explosiv");
      } else if (license == "ADR_RADIOACTIVE") {
        translatedAdditionalLicense.push("ADR-Radioaktiv");
      } else {
        translatedAdditionalLicense.push("Not available");
      }
    });

    return translatedAdditionalLicense.join(', ');
  }

  getVehicleTypeExperience(vehicleType) {
    let translatedVehicleType = [];
    vehicleType.forEach(type => {
      if (type == "tractor-trailer") {
        translatedVehicleType.push('Sattelzug');
      } else if (type == "solo-vehicle") {
        translatedVehicleType.push("Solofahrzeug");
      } else if (type == "articulated-train") {
        translatedVehicleType.push("Gliederzug");
      } else if (type == "refrigerated-vehicle") {
        translatedVehicleType.push("Kühlfahrzeug");
      } else if (type == "swap-body") {
        translatedVehicleType.push("Wechselbrücke");
      } else if (type == "tanker") {
        translatedVehicleType.push("Tankfahrzeug");
      } else if (type == "silo") {
        translatedVehicleType.push("Silo");
      } else {
        translatedVehicleType.push("Not available");
      }
    });

    return translatedVehicleType.join(', ');
  }

}
