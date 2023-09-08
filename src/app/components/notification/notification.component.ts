import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
// import { AuthService } from "./services/auth.service";
import { Subscription } from "rxjs";
// import { JobService } from "./services/job.service";
import {DeviceDetectorService} from "ngx-device-detector";
import { NotificationService } from "../../services/notification.service";
import { Observable } from 'rxjs';
import { share, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public isMobile = false;
 
  CuserUser :any ;
  screenHeight : number;

  jobs: any;
  isSpinner = false;
  checkInactive = false;
  
  nextPage =  1;
  public notificationResult: Array<any> = [];
  private currentPage = 1;
  private request$: Observable<any>;

  constructor(private deviceService: DeviceDetectorService,
              private notificationService: NotificationService) {
      this.isMobile = this.deviceService.isMobile();
      this.screenHeight = (window.innerHeight - 100);
  }


  getNotifications(page) {
    this.checkInactive = false;
    this.notificationService.getNotificationOverview(page).subscribe(resData => {
      this.jobs = resData;
      for (let job of this.jobs.results) {
        job.isInactiveStart = false;
        if (this.checkInactive == false && job.is_active == false) {
          job.isInactiveStart = true;
          this.checkInactive = true;
        }
        if (job.match.length > 0) {
          job.chatUnreadCount = 0;
          job.unSeenApplierCount = 0;
          job.cancelCount = 0;
        }
      }
      this.isSpinner = false;
      this.currentPage++;
      this.nextPage = this.jobs?.next;
      this.notificationResult = this.notificationResult.concat(this.jobs?.results);
    }, error => {
      console.log("error occurred");
      console.log(error);
    });
  }

  onScrollUp(): void {
    if(!this.nextPage){
      return 
    }
    this.getNotification(this.currentPage)
      .pipe(finalize(() => this.onFinalize()))
      .subscribe((news) => {
      },error => {
        console.log("error occurred");
        console.log(error);
      });
  }

  onScrollDown(): void {
    if(!this.nextPage){
      return 
    }
    this.isSpinner = true;
    this.getNotification(this.currentPage)
      .pipe(finalize(() => this.onFinalize()))
      .subscribe((res) => {
        this.nextPage = res.next;
        for (let job of res.results) {
          job.isInactiveStart = false;
        }
        this.isSpinner = false;
        this.notificationResult = this.notificationResult.concat(res.results);
      }, error => {
          console.log("error occurred");
          console.log(error);
        });
  }

  // Prevent duplicate requests on scroll.
  // More: https://stackoverflow.com/a/50865911/6441494
  private getNotification(page: any = 1): Observable<any> {
    if (this.request$) {
      return this.request$;
    } else {
      this.currentPage++;
      this.request$ = this.notificationService.getV2(page);
      return this.request$;
    }
  }

  private onFinalize(): void {
    this.isSpinner = false;
    this.request$ = null;
  }

  setMarkRead(event,notificationId){
    console.log(notificationId)
    document.getElementById("notifyId"+notificationId).classList.remove("bullet");
    document.getElementById("notifyId"+notificationId).classList.add("bullet-read");
  }
 
  ngOnInit() {
    this.CuserUser = JSON.parse(localStorage.getItem("userData"));
    if(!this.CuserUser){
      return false
    }
    this.getNotifications(1);
  }
  
}
