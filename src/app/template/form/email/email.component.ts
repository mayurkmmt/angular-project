import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  subscriptions: Array<Subscription> = [];
  @Input("formGroup") emailFormGroup: FormGroup;


  constructor(private _formBuilder: FormBuilder, public stepperservice: StepperService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.emailFormGroup.statusChanges.subscribe(() => {
        const map = this.stepperservice.state.value;
        if (this.emailFormGroup.valid != map[0].valid) {
          map[11].valid = this.emailFormGroup.valid;
          map[12].disabled = false;
          this.stepperservice.state.next(map);
        }
      })
    )
  }

  getErrorMessage() {
    return this.emailFormGroup.hasError('required', 'email') ? 'Du musst einen Wert eingeben' :
      this.emailFormGroup.hasError('email', 'email') ? 'keine gültige email' : '';
  }
  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}

