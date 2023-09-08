import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  @Input("formGroup") languageFormGroup: FormGroup;
  @Input("languageObj") languageObj: any;
  isEnable = true;

  constructor(private _formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }

    if (this.languageObj) {
      this.languageFormGroup.patchValue(this.languageObj);
    } else {
      this.languageFormGroup.patchValue({
        german: 0,
        english: 0
      });
    }
  }
}
