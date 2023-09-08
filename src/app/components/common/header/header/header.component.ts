import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isRegisterPage = false;

  constructor(public route: Router) {
    this.route.events.subscribe((event) => {
      this.isRegisterPage = this.route.routerState.snapshot.url == "/register" || this.route.routerState.snapshot.url == "/register2";
    });
  }

  ngOnInit() {
  }

}
