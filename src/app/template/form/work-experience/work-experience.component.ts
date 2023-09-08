import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {
  @Input("formGroup") workExperienceFormGroup: FormGroup;
  isEnable = true;

  constructor(private _formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }
  }


  setMaxValue(event) {
    if (this.workExperienceFormGroup.value.sliderValue > 30) {
      console.log(this.workExperienceFormGroup.value.sliderValue)
      this.workExperienceFormGroup.patchValue({
        sliderValue: 30,
      });
    }
  }

}
