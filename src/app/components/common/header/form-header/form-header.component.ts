import { Component, OnInit, OnDestroy } from '@angular/core';
import { StepperService } from 'src/app/services/stepper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit, OnDestroy {
  index: any;
  process: any;
  subscriptions: Array<Subscription> = [];

  constructor(public stepperService: StepperService) {
    this.process = 0;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.stepperService.index.subscribe((index) => {
        this.process = index * 100 / 13;
        this.index = index;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x=>x.unsubscribe());
  }

  goToBack() {
    this.index = this.stepperService.index.value - 1;
    if (!this.stepperService.state.value[this.index].disabled) {
      this.stepperService.index.next(this.index)
    }
  }

  goToForward() {
    this.index = this.stepperService.index.value + 1;
    if (!this.stepperService.state.value[this.index].disabled) {
      this.stepperService.index.next(this.index)
    }
  }
}
