import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {
  @Input("formGroup") personFormGroup: FormGroup;
  @Input("selectedBirthYear") selectedBirthYear: FormGroup;
  @Output() onNumberEntered: EventEmitter<any> = new EventEmitter<any>();
  isEnable = true;
  subscriptions: Array<Subscription> = [];
  years = [];
  isQuestionnairesPage = true;
  dial_code: any;
  isError = false;
  errorMessage: string;

  constructor(private _formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isQuestionnairesPage = false
      this.isEnable = false;
    }

    let minYear = 1950;
    let maxYear = new Date().getFullYear();
    for (let i = minYear; i <= maxYear; i++) {
      this.years.push(i);
    }
  }

  telInputObject(obj) {
    obj.setCountry('de');
    if (this.isQuestionnairesPage) {
      this.dial_code = '+49'
      this.personFormGroup.patchValue({
        dial_code: this.dial_code
      });
    }
    this.onNumberEntered.emit(obj);
  }

  getNumber(number) {
    // console.log(number);
  }

  onCountryChange(obj) {
    this.onNumberEntered.emit(obj);
    if (this.isQuestionnairesPage && obj.dialCode) {
      this.dial_code = '+' + obj.dialCode;
      this.personFormGroup.patchValue({
        dial_code: this.dial_code
      });
    }
  }

  hasError(error) {
    // console.log(error);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  checkZero(event) {
    let input = event.currentTarget.value;
    // console.log(input);
    if (input.search(/^0/) != -1) {
      this.isError = true;
      this.errorMessage = "You have entered the country code twice";
      this.personFormGroup.patchValue({
        phone: ''
      })
      // console.log("you enter 0");
    } else {
      this.isError = false;
      this.errorMessage = "";
    }
  }
}
