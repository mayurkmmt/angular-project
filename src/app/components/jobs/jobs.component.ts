import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  isMobile: boolean;
  subscriptions: Array<Subscription> = [];
  public id: number;

  constructor(public router: Router, public route: ActivatedRoute, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.id = +params['id'];
      })
    );
  }

}
