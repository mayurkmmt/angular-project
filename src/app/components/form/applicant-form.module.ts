import {NgModule} from "@angular/core";

import {FormComponent} from "./form.component";
import {PersonComponent} from "../../template/form/person/person.component";
import {EducationComponent} from "../../template/form/education/education.component";
import {FurtherEducationComponent} from "../../template/form/further-education/further-education.component";
import {VehicleExperienceComponent} from "../../template/form/vehicle-experience/vehicle-experience.component";
import {CheckboxComponent} from "../../template/form/fields/checkbox/checkbox.component";
import {LanguageComponent} from "../../template/form/language/language.component";
import {WorkExperienceComponent} from "../../template/form/work-experience/work-experience.component";
import {WorkingShiftsComponent} from "../../template/form/working-shifts/working-shifts.component";
import {EarliestStartDateComponent} from "../../template/form/earliest-start-date/earliest-start-date.component";
import {FormNavbarComponent} from "../../template/form/form-navbar/form-navbar.component";
import {PostcodeComponent} from "../../template/form/postcode/postcode.component";
import {FurtherEducationProfileComponent} from "../../template/profile/furthereducationprofil/further-education-profile.component";
import {ToursComponent} from "../../template/form/tours/tours.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatSliderModule} from "@angular/material/slider";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations:[
    // FormComponent,
    // PersonComponent,
    // EducationComponent,
    // FurtherEducationComponent,
    // VehicleExperienceComponent,
    // CheckboxComponent,
    // LanguageComponent,
    // WorkExperienceComponent,
    // WorkingShiftsComponent,
    // EarliestStartDateComponent,
    // FormNavbarComponent,
    // PostcodeComponent,
    // FurtherEducationProfileComponent,
    // ToursComponent,
  ],
  imports:[
  ],
  exports:[
    // FormComponent,
    // PersonComponent,
    // EducationComponent,
    // FurtherEducationComponent,
    // VehicleExperienceComponent,
    // CheckboxComponent,
    // LanguageComponent,
    // WorkExperienceComponent,
    // WorkingShiftsComponent,
    // EarliestStartDateComponent,
    // FormNavbarComponent,
    // PostcodeComponent,
    // FurtherEducationProfileComponent,
    // ToursComponent,
  ]
})
export class ApplicantFormModule {

}
