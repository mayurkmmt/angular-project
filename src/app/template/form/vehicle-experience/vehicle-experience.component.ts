import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";


@Component({
  selector: 'app-vehicle-experience',
  templateUrl: './vehicle-experience.component.html',
  styleUrls: ['./vehicle-experience.component.scss']
})

export class VehicleExperienceComponent implements OnInit {
  @Input("formGroup") vehicleExperienceFormGroup: FormGroup;
  subscriptions: Array<Subscription> = [];
  isEnable = true;

  constructor(private _formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
