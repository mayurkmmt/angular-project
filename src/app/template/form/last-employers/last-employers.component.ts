import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-last-employers',
  templateUrl: './last-employers.component.html',
  styleUrls: ['./last-employers.component.sass']
})
export class LastEmployersComponent implements OnInit {

  @Input("formGroup") lastEmployerFormGroup: FormGroup;
  isEnable = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.routerState.snapshot.url == "/my-profile") {
      this.isEnable = false;
    }
  }

}
