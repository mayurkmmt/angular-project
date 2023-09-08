import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import * as moment from 'moment';
@Component({
  selector: 'app-earliest-start-date',
  templateUrl: './earliest-start-date.component.html',
  styleUrls: ['./earliest-start-date.component.scss']
})
export class EarliestStartDateComponent implements OnInit {
  @Input("formGroup") startFormGroup: FormGroup;
  @Input("earliestStartDate") earliestStartDate: Date;
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();
  title = 'ng-calendar-demo';
  selectedDate = new Date();
  startAt = new Date();
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 24));
  isEnable = true;

  constructor(private _formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }
    if (this.earliestStartDate) {
      this.selectedDate = this.earliestStartDate;
      this.startAt = this.earliestStartDate;
    } else {
      this.onDatePicked.emit(this.selectedDate);
    }

  }

  onSelect(event) {
    this.selectedDate = event;
    this.onDatePicked.emit(event);
  }

  DateFilterBkp = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    // return day !== 0 && day !== 6;
    return true;
  }

  DateFilter = (d: Date): boolean => {
    let myDate;
    let momentToDate = moment(d).toDate();
    const day = (momentToDate || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    // return day !== 0 && day !== 6;
    return true;
  }

}
