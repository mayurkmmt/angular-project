import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";
import {JobService} from "../../../../services/job.service";
import {LanguageModel} from "../../../../models/language.model";

@Component({
  selector: 'app-public-job-details',
  templateUrl: './public-job-details.component.html',
  styleUrls: ['./public-job-details.component.scss']
})
export class PublicJobDetailsComponent implements OnInit {
  @Input('jobId') jobId: number;
  isMobile: boolean;
  jobDetails: any;
  germanLanSkill: string
  distance: number;
  isSpinner = true;
  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              private deviceService: DeviceDetectorService,
              private jobService: JobService) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
    this.getJobDetails();
  }

  ngOnChanges() {
    this.getJobDetails();
  }

  getJobDetails() {
    this.jobService.publicGetJobDetails(this.jobId).subscribe(resData => {
      this.jobDetails = resData;
      this.distance = this.jobDetails.distance;
      for (let lan of this.jobDetails.language) {
        if (lan.id <= 3) {
          this.germanLanSkill = new LanguageModel().getLanguageSkill(lan.id);
        }
      }
      this.isSpinner = false;
    }, error => {
      this.isSpinner = false;
      console.log("error occurred");
      console.log(error);
    });
  }

  getTours(tours) {
    let translatedTours = [];
    tours.forEach(tour => {
      if (tour == "local") {
        translatedTours.push('Nahverkehr');
      } else if (tour == "national") {
        translatedTours.push("Fernverkehr (national)");
      } else if (tour == "international") {
        translatedTours.push("Fernverkehr (international)");
      } else {
        translatedTours.push("Not available");
      }
    });

    if (tours.length > 1) {
      let finalStr = translatedTours.join(', ');
      return finalStr.replace(/,(?=[^,]*$)/, ' oder ');
    } else {
      return translatedTours.join(', ');
    }
  }

  getShifts(shifts) {
    let translatedShifts = [];
    shifts.forEach(shift => {
      if (shift == "day") {
        translatedShifts.push('Tagesschicht');
      } else if (shift == "night") {
        translatedShifts.push("Nachtschicht");
      } else if (shift == "weekend") {
        translatedShifts.push("Wochenende");
      } else if (shift == "all") {
        translatedShifts.push("Wechselschicht");
      } else {
        translatedShifts.push("Not available");
      }
    });
    return translatedShifts.join(', ');
  }

  getVehicleTypeExperience(vehicleType: [string]) {
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
      } else if (type == "heavy-transport") {
        translatedVehicleType.push("Schwertransporte");
      } else {
        translatedVehicleType.push("Not available");
      }
    });
    if (vehicleType.length > 1) {
      let finalStr = translatedVehicleType.join(', ');
      return finalStr.replace(/,(?=[^,]*$)/, ' oder ');
    } else {
      return translatedVehicleType.join(', ');
    }
  }

  getAdditionalLicense(additionalLicense: [string]) {
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
    if (additionalLicense.length > 1) {
      let finalStr = translatedAdditionalLicense.join(', ');
      return finalStr.replace(/,(?=[^,]*$)/, ' und ');
    } else {
      return translatedAdditionalLicense.join(', ');
    }
  }

  confirmJobApplication() {

  }

  rejectJobApplication() {

  }

}
