import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";
import {JobService} from "../../../services/job.service";
import {environment} from "../../../../environments/environment.prod";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-job-overview',
  templateUrl: './job-overview.component.html',
  styleUrls: ['./job-overview.component.scss']
})
export class JobOverviewComponent implements OnInit {

  isMobile: boolean;
  jobId: number;
  jobList: any;
  subscriptions: Array<Subscription> = [];
  isSpinner = true;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              private deviceService: DeviceDetectorService,
              private jobService: JobService) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(params => {
        this.jobId = +params['id'];
        this.isSpinner = false;
        if (!this.jobId && !this.isMobile) {
          this.jobService.publicGetAllJob()
            .subscribe(resData => {
              this.jobList = resData;
              this.isSpinner = false;
              if (this.jobList.results.length >= 1) {
                this.jobId = this.jobList.results[0].id;
              } else {
                // TODO:Handle with proper message
              }
            }, errorMessage => {
              console.log('errorMessage In user-match component');
              console.log(errorMessage);
            });
        }
      })
    );
  }

  // getWithParams(url) {
  //   let parts = url.split("/");
  //   let param = parts[parts.length - 1];
  //   this.jobService.publicGetAllJob(param).subscribe(resData => {
  //     this.jobList = resData;
  //     this.jobId = this.jobList.results[0].id;
  //   }, error => {
  //     console.log("error occurred");
  //     console.log(error);
  //   });
  // }

}
