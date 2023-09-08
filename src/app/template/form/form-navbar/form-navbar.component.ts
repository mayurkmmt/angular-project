import { Component, OnInit, OnDestroy } from '@angular/core';
import { StepperService } from 'src/app/services/stepper.service';
// import { Formnavbar } from 'src/app/classes/formnavbar';
import { FormNavbarModel } from "../../../models/form-navbar.model";
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-form-navbar',
  templateUrl: './form-navbar.component.html',
  styleUrls: ['./form-navbar.component.scss']
})
export class FormNavbarComponent implements OnInit, OnDestroy {
  public isMobile = false;
  navItems: FormNavbarModel[] = [
    // { id: 0, title: "Anmeldung", icon: "sign-in-alt", child: false },
    { id: 0, title: "Führerscheine", icon: "id-badge", child: false },
    { id: 1, title: "BKrFQG", icon: "id-badge", child: false },
    { id: 2, title: "Erfahrungen", icon: "clipboard-list", child: true },
    { id: 3, title: "Weitere Scheine", icon: "puzzle-piece", child: true },
    { id: 4, title: "Arbeitserfahrung", icon: "battery-three-quarters", child: true },
    { id: 5, title: "Arbeitgeber", icon: "building", child: true },
    { id: 6, title: "Schichten", icon: "user-clock", child: true },
    { id: 7, title: "Touren", icon: "drafting-compass", child: true },
    { id: 8, title: "Eintrittstermin", icon: "calendar-week", child: true },
    { id: 9, title: "Standort", icon: "street-view", child: true },
    { id: 10, title: "Sprache", icon: "language", child: false },
    { id: 11, title: "Persönliches", icon: "user", child: false },
    { id: 12, title: "Rechtliches", icon: "vote-yea", child: false },
    { id: 13, title: "Anmeldung", icon: "sign-in-alt", child: false },

  ];
  range = [0, 1, 2, 3, 4];
  subscriptions: Array<Subscription> = [];

  constructor(
    public stepperService: StepperService,
    private deviceService: DeviceDetectorService
  ) {
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.subscriptions.push(
      this.stepperService.index.subscribe((index) => {
        var start = index - 2;
        if (start < 0) {
          start = 0;
        }
        this.range = [];
        if (this.isMobile) {
          var plus = 12;
          start = 0;
        }else{
          var plus=4;
        }
        for (var i = start; i <= start + plus; i++) {
          this.range.push(i);
        }
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  goToStep(index: number) {
    if (!this.stepperService.state.value[index].disabled)
      this.stepperService.index.next(index)
  }
}
