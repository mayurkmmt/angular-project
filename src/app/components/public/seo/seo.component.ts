import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { JobService } from "../../../services/job.service";
import { environment } from "../../../../environments/environment.prod";
import { LanguageModel } from "../../../models/language.model";

@Component({
  selector: 'app',
  template: `
    <ngx-json-ld [json]="schema"></ngx-json-ld>`,
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {

  schema: any;
  @Input('seoJobId') seoJobId: number;
  jobDetails: any;
  germanLanSkill: any;
  minSalary: any;
  maxSalary: any;
  constructor(private jobService: JobService) {
  }

  ngOnInit(): void {
    this.getJobDetails();
  }
  ngOnChanges() {
    this.getJobDetails();
  }
  getJobDetails() {
    this.jobService.publicGetJobDetails(this.seoJobId).subscribe(resData => {
      this.jobDetails = resData;
      // console.log(this.jobDetails)
      // let date = new Date(this.jobDetails.created_at);
      let date = new Date(this.jobDetails.external_created_at);
      let jobPosted = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      // year-month-day 
      for (let lan of this.jobDetails.language) {
        if (lan.id <= 3) {
          this.germanLanSkill = new LanguageModel().getLanguageSkill(lan.id);
        }
      }
      
      for (let tour of this.jobDetails.tours) {
        if (tour == 'local') {
          this.minSalary = (this.jobDetails.salary_minimum > 0) ? this.jobDetails.salary_minimum : 2300;
          this.maxSalary = (this.jobDetails.salary_maximum > 0) ? this.jobDetails.salary_maximum : 2900;
        }
        if (tour == 'national' || tour == 'international') {
          this.minSalary = (this.jobDetails.salary_minimum > 0) ? this.jobDetails.salary_minimum : 2500;
          this.maxSalary = (this.jobDetails.salary_maximum > 0) ? this.jobDetails.salary_maximum : 3100;
        }
      }
   
      let description = this.getContent();
      this.schema = {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": this.jobDetails.external_title,
        // "title": this.jobDetails.title,
        "description": description,
        "datePosted": jobPosted,
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "jobportal GbR",
          "logo": "https://app.jobportal.com/assets/favicon_white_green.png"
        },
        "jobLocation": {
          "@type": "Place",
          "geo": {
            "@type": ' GeoCoordinates',
            "longitude": this.jobDetails.longitude,
            "latitude": this.jobDetails.latitude
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": this.jobDetails.city,
            "postalCode": this.jobDetails.postcode,
            "addressCountry": {
              '@type': 'Country',
              'name': 'DE'
            }
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": {
            "@type": "QuantitativeValue",
            'maxValue': this.maxSalary,
            'minValue': this.minSalary,
            // 'maxValue': this.jobDetails.tours.includes('local') ? 2700 : 3000,
            // 'minValue': this.jobDetails.tours.includes('local') ? 3200 : 3500,
            "unitText": "MONTH"
          }
        }
      };
    }, error => {
      console.log("error occurred");
      console.log(error);
    });
  }

  getContent() {
    let germanShift = [];
    let vehicleTypes = [];
    let tours = [];

    let shiftStr;
    shiftStr = this.getShifts(this.jobDetails?.shift);

    // vehicle_experience
    let vehicleTypesStr;
    vehicleTypesStr = this.getVehicleTypeExperience(this.jobDetails?.vehicle_experience);

    let toursStr;
    toursStr = this.getTours(this.jobDetails?.tours);

    let workExperience;
    if (this.jobDetails.work_experience > 0) {
      workExperience = 'Berufserfahrung von mindestens ' + this.jobDetails.work_experience + ' Jahren';
    } else {
      workExperience = "Keine Berufserfahrung notwendig";
    }

    let translatedAdditionalLicense = [];
    let isAdditionalLicense = false;
    let finalAdditionalLicenseStr;
    if (this.jobDetails.additional_license[0] != 'No driver licence' &&
      this.jobDetails.additional_license[0] != 'NO_LICENSE' &&
      this.jobDetails.additional_license.length > 0) {
      isAdditionalLicense = true;
      finalAdditionalLicenseStr = this.getAdditionalLicense(this.jobDetails.additional_license);
    }

    if (isAdditionalLicense) {
      if (this.jobDetails.work_experience > 0) {
        return `
            <p><strong>Du bist LKW Fahrer (m/w/d) und hast Lust auf was Neues?<br>
              Wir suchen dich als Fahrer!</strong></p>
            <p>Wir suchen ab sofort einen Fahrer/ LKW-Fahrer (m/w/d) in ${this.jobDetails.city} und Umgebung  für den ${toursStr}</p>
            <p><strong>&#10003;<span>Bewirb dich in 2 Minuten ganz ohne Unterlagen</span></strong></p>
            <p><strong>Das erwartet Dich:</strong></p>
            <ul>
             <li>Eine verantwortungsvolle Tätigkeit als LKW-Fahrer in  ${this.jobDetails.city}  im ${toursStr}
             mit einem ${vehicleTypesStr}</li>
            <li>Du hast feste Arbeitszeiten (${shiftStr})</li>
            <li>Ein nettes Team, das sich gegenseitig unterstützt</li>
            <li>Ein fairer Arbeitgeber und gute Bezahlung</li>
            </ul>
            <p><strong>Das solltest du mitbringen:</strong></p>
            <ul>
            <li>Du besitzt einen Führerschein der Klasse ${this.jobDetails.license}</li>
            <li>Du verfügst über ${this.germanLanSkill} der deutschen Sprache für den  Kundenkontakt</li>
            <li>Du lieferst eine effiziente, termingerechte und freundliche Kundenbelieferung</li>
            </ul>
            <p><strong>Idealerweise hast du das auch:</strong></p>
            <ul>
            <li>Einen ${finalAdditionalLicenseStr}</li>
            <li ${this.jobDetails.work_experience > 0}>${workExperience}</li>
            <li>Erfahrung auf folgendem Fahrzeugtyp: ${vehicleTypesStr}</li>
            </ul>
            <p><strong>${this.jobDetails.being_transported ? 'Das transportierst du:' : ''}</strong></p>
            <p>${this.jobDetails.being_transported}</p>
            <p><strong>${this.jobDetails.specific_tasks ? 'Was ist uns sonst noch wichtig:' : ''} </strong></p>
            <p>${this.jobDetails.specific_tasks}</p>
            <p><strong>${this.jobDetails.benefit ? 'Das bieten wir dir:' : ''}</strong></p>
            <p>${this.jobDetails.benefit} </p>
            <br><p>Die Stelle passt perfekt zu dir? Dann bewirb dich jetzt über JobPortal!</p>
    `;
      } else {
        return `
            <p><strong>Du bist LKW Fahrer (m/w/d) und hast Lust auf was Neues?<br>
              Wir suchen dich als Fahrer!</strong></p>
            <p>Wir suchen ab sofort einen Fahrer/ LKW-Fahrer (m/w/d) in ${this.jobDetails.city} und Umgebung  für den ${toursStr}</p>
            <p><strong>&#10003;<span>Bewirb dich in 2 Minuten ganz ohne Unterlagen</span></strong></p>
            <p><strong>Das erwartet Dich:</strong></p>
            <ul>
               <li>Eine verantwortungsvolle Tätigkeit als LKW-Fahrer in  ${this.jobDetails.city}  im ${toursStr}
               mit einem ${vehicleTypesStr}</li>
              <li>Du hast feste Arbeitszeiten (${shiftStr})</li>
              <li>Ein nettes Team, das sich gegenseitig unterstützt</li>
              <li>Ein fairer Arbeitgeber und gute Bezahlung</li>
            </ul>
            <p><strong>Das solltest du mitbringen:</strong></p>
            <ul>
              <li>Du besitzt einen Führerschein der Klasse ${this.jobDetails.license}</li>
              <li>Du verfügst über ${this.germanLanSkill} der deutschen Sprache für den  Kundenkontakt</li>
              <li>Du lieferst eine effiziente, termingerechte und freundliche Kundenbelieferung</li>
            </ul>
            <p><strong>Idealerweise hast du das auch:</strong></p>
            <ul>
              <li>Einen ${finalAdditionalLicenseStr}</li>
              <li>Erfahrung auf folgendem Fahrzeugtyp: ${vehicleTypesStr}</li>
            </ul>
            <p><strong>${this.jobDetails.being_transported ? 'Das transportierst du:' : ''}</strong></p>
            <p>${this.jobDetails.being_transported}</p>
            <p><strong>${this.jobDetails.specific_tasks ? 'Was ist uns sonst noch wichtig:' : ''} </strong></p>
            <p>${this.jobDetails.specific_tasks}</p>
            <p><strong>${this.jobDetails.benefit ? 'Das bieten wir dir:' : ''}</strong></p>
            <p>${this.jobDetails.benefit} </p>
            <br><p>Die Stelle passt perfekt zu dir? Dann bewirb dich jetzt über JobPortal!</p>
    `;
      }

    } else {
      if (this.jobDetails.work_experience > 0) {
        return `
          <p><strong>Du bist LKW Fahrer (m/w/d) und hast Lust auf was Neues?<br>
            Wir suchen dich als Fahrer!</strong></p>
          <p>Wir suchen ab sofort einen Fahrer/ LKW-Fahrer (m/w/d) in ${this.jobDetails.city} und Umgebung  für den ${toursStr}</p>
          <p><strong>&#10003;<span>Bewirb dich in 2 Minuten ganz ohne Unterlagen</span></strong></p>
          <p><strong>Das erwartet Dich:</strong></p>
          <ul>
           <li>Eine verantwortungsvolle Tätigkeit als LKW-Fahrer in  ${this.jobDetails.city}  im ${toursStr}
           mit einem ${vehicleTypesStr}</li>
          <li>Du hast feste Arbeitszeiten (${shiftStr})</li>
          <li>Ein nettes Team, das sich gegenseitig unterstützt</li>
          <li>Ein fairer Arbeitgeber und gute Bezahlung</li>
          </ul>
          <p><strong>Das solltest du mitbringen:</strong></p>
          <ul>
          <li>Du besitzt einen Führerschein der Klasse ${this.jobDetails.license}</li>
          <li>Du verfügst über ${this.germanLanSkill} der deutschen Sprache für den  Kundenkontakt</li>
          <li>Du lieferst eine effiziente, termingerechte und freundliche Kundenbelieferung</li>
          </ul>
          <p><strong>Idealerweise hast du das auch:</strong></p>
          <ul>
          <li ${this.jobDetails.work_experience > 0}>${workExperience}</li>
          <li>Erfahrung auf folgendem Fahrzeugtyp: ${vehicleTypesStr}</li>
          </ul>
          <p><strong>${this.jobDetails.being_transported ? 'Das transportierst du:' : ''}</strong></p>
          <p>${this.jobDetails.being_transported}</p>
          <p><strong>${this.jobDetails.specific_tasks ? 'Was ist uns sonst noch wichtig:' : ''} </strong></p>
          <p>${this.jobDetails.specific_tasks}</p>
          <p><strong>${this.jobDetails.benefit ? 'Das bieten wir dir:' : ''}</strong></p>
          <p>${this.jobDetails.benefit} </p>
          <br><p>Die Stelle passt perfekt zu dir? Dann bewirb dich jetzt über JobPortal!</p>
          `;
      } else {
        return `
          <p><strong>Du bist LKW Fahrer (m/w/d) und hast Lust auf was Neues?<br>
            Wir suchen dich als Fahrer!</strong></p>
          <p>Wir suchen ab sofort einen Fahrer/ LKW-Fahrer (m/w/d) in ${this.jobDetails.city} und Umgebung  für den ${toursStr}</p>
          <p><strong>&#10003;<span>Bewirb dich in 2 Minuten ganz ohne Unterlagen</span></strong></p>
          <p><strong>Das erwartet Dich:</strong></p>
          <ul>
           <li>Eine verantwortungsvolle Tätigkeit als LKW-Fahrer in  ${this.jobDetails.city}  im ${toursStr}
           mit einem ${vehicleTypesStr}</li>
          <li>Du hast feste Arbeitszeiten (${shiftStr})</li>
          <li>Ein nettes Team, das sich gegenseitig unterstützt</li>
          <li>Ein fairer Arbeitgeber und gute Bezahlung</li>
          </ul>
          <p><strong>Das solltest du mitbringen:</strong></p>
          <ul>
          <li>Du besitzt einen Führerschein der Klasse ${this.jobDetails.license}</li>
          <li>Du verfügst über ${this.germanLanSkill} der deutschen Sprache für den  Kundenkontakt</li>
          <li>Du lieferst eine effiziente, termingerechte und freundliche Kundenbelieferung</li>
          </ul>
          <p><strong>Idealerweise hast du das auch:</strong></p>
          <ul>
          <li>Erfahrung auf folgendem Fahrzeugtyp: ${vehicleTypesStr}</li>
          </ul>
          <p><strong>${this.jobDetails.being_transported ? 'Das transportierst du:' : ''}</strong></p>
          <p>${this.jobDetails.being_transported}</p>
          <p><strong>${this.jobDetails.specific_tasks ? 'Was ist uns sonst noch wichtig:' : ''} </strong></p>
          <p>${this.jobDetails.specific_tasks}</p>
          <p><strong>${this.jobDetails.benefit ? 'Das bieten wir dir:' : ''}</strong></p>
          <p>${this.jobDetails.benefit} </p>
          <br><p>Die Stelle passt perfekt zu dir? Dann bewirb dich jetzt über JobPortal!</p>
          `;
      }

    }

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
}
