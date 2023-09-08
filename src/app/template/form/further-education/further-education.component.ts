import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-further-education',
  templateUrl: './further-education.component.html',
  styleUrls: ['./further-education.component.scss']
})
export class FurtherEducationComponent implements OnInit, OnDestroy {
  @Input("formGroup") furtherEducationFormGroup: FormGroup;
  subscriptions: Array<Subscription> = [];
  isEnable = true;
  isAdditionalLicense = false;


  constructor(private _formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }
  }

  ngOnDestroy() {
    // this.subscriptions.forEach(x => x.unsubscribe());
  }

  toggleEditable(values: any): void {
    if (values.checked == true) {
      this.furtherEducationFormGroup.patchValue({
        'NO_LICENSE': true,
        'FORKLIFT': false,
        'CRANE': false,
        'ADR_BASIC': false,
        'ADR_TANK': false,
        'ADR_EXPLOSIVE': false,
        'ADR_RADIOACTIVE': false
      });
    }else{
      this.furtherEducationFormGroup.patchValue({
        'NO_LICENSE': false,
      });
    }
  }

  onValueChange(event) {
    // furtherEducationFormGroup
    if (this.furtherEducationFormGroup.value.FORKLIFT == true ||
      this.furtherEducationFormGroup.value.CRANE == true ||
      this.furtherEducationFormGroup.value.ADR_BASIC == true ||
      this.furtherEducationFormGroup.value.ADR_TANK == true ||
      this.furtherEducationFormGroup.value.ADR_EXPLOSIVE == true ||
      this.furtherEducationFormGroup.value.ADR_RADIOACTIVE == true) {
      this.furtherEducationFormGroup.patchValue({
        'NO_LICENSE': false,
      });
    }  

    // if (this.furtherEducationFormGroup.value.hasOwnProperty('NO_LICENSE') && this.furtherEducationFormGroup.value.NO_LICENSE) {
    //   this.isAdditionalLicense = true;
    //   this.furtherEducationFormGroup.patchValue({
    //       'NO_LICENSE': true,
    //       'FORKLIFT': false,
    //       'CRANE': false,
    //       'ADR_BASIC': false,
    //       'ADR_TANK': false,
    //       'ADR_EXPLOSIVE': false,
    //       'ADR_RADIOACTIVE': false
    //   });
    // } else {
    //   this.isAdditionalLicense = false;
    // }
  }

}
