import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-working-shifts',
  templateUrl: './working-shifts.component.html',
  styleUrls: ['./working-shifts.component.scss']
})
export class WorkingShiftsComponent implements OnInit, OnDestroy {
  @Input("formGroup") shiftsFormGroup: FormGroup;
  subscriptions: Array<Subscription> = [];
  isEnable = true;

  constructor(private _formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
