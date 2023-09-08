import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
const codes = require('german-postal-codes')

@Component({
  selector: 'app-postcode',
  templateUrl: './postcode.component.html',
  styleUrls: ['./postcode.component.scss']
})
export class PostcodeComponent implements OnInit {
  @Input("formGroup") locationFormGroup: FormGroup;
  @Input("distance") distance: number;
  isEnable = true;
  isPostcodeValid = false;
  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }
    if (this.distance) {
      this.locationFormGroup.patchValue({
        sliderValue: this.distance,
      });
    } else {
      this.locationFormGroup.patchValue({
        sliderValue: 80,
      });
    }
  }

  setMaxValue(event) {
    if (this.locationFormGroup.value.sliderValue > 100) {
      this.locationFormGroup.patchValue({
        sliderValue: 100,
      });
    }
  }
  checkPostCode(event: any) {
    // console.log(event.target.value + "  => value")
    if(this.locationFormGroup.value.postcode !== 'undefined'){
      var target=codes.find(temp=>temp==this.locationFormGroup.value.postcode)
      if(target)
        this.isPostcodeValid = false;
      else
        this.isPostcodeValid = true;
    }
  }

}
