import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";


@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit,OnDestroy {
  @Input("formGroup") toursFormGroup: FormGroup;
  subscriptions: Array<Subscription> = [];
  isEnable = true;

  constructor(private _formBuilder: FormBuilder,
              private router: Router) {   }

  ngOnInit(): void {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }


  onChange(event: any) {
    if (this.toursFormGroup.value.national == true || this.toursFormGroup.value.international == true) {
      this.toursFormGroup.patchValue({
        // 'local': false
      });
    }
  }

  checkLocalTransport(values: any): void {
    if (values.checked == true) {
      this.toursFormGroup.patchValue({
        // 'national': false,
        // 'international': false,
      });
    }else{
      this.toursFormGroup.patchValue({
        // 'local': false,
      });
    }
  }

}


