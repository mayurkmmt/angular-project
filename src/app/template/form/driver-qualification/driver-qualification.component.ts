import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-qualification',
  templateUrl: './driver-qualification.component.html',
  styleUrls: ['./driver-qualification.component.sass']
})
export class DriverQualificationComponent implements OnInit {
  @Input("formGroup") driverQualificationFormGroup: FormGroup;
  isEnable = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }
  }

}
