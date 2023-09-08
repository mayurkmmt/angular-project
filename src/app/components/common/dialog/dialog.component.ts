import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserDetailsComponent} from "../../dashboard/user-details/user-details.component";
import {ApplicantService} from "../../../services/applicant.service";
import {ApplicantStatusModel} from "../../../models/applicant-status.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  jobId: number;
  isApply = false;
  isReject = false;
  isRefuse = false;
  jobStatus = 0;
  isApplicationPage = false;

  constructor(private applicantService: ApplicantService,
              public dialog: MatDialog,
              private router: Router,
              private dialogRef: MatDialogRef<UserDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.jobId = data.jobId;
    this.isApply = data.isApply;
    this.isReject = data.isReject;
    this.isRefuse = data.isRefuse;
    console.log(" ------ Job Status  ----- ");
    console.log(data.jobStatus);
    this.jobStatus = Number(data.jobStatus);
      if (this.router.routerState.snapshot.url.startsWith("/applications")) {
      this.isApplicationPage = true;
    }
  }

  ngOnInit(): void {
  }

  doApply() {
    let data = {
      status: new ApplicantStatusModel().APPLIED
    }
    this.applicantService.doUpdateStatus(data, this.jobId).subscribe(resData => {
      this.isApply = false;
      this.isReject = false;
      this.isRefuse = false;
      const dialogRef = this.dialog.open(DialogSuccess, {});
    }, errorMessage => {
      console.log("errorMessage In user-match component");
      console.log(errorMessage);

    });
  }

  doReject() {
    let data = {
      status: new ApplicantStatusModel().APPLICANT_CANCEL
    }

    this.applicantService.doUpdateStatus(data, this.jobId).subscribe(resData => {
      this.isApply = false;
      this.isReject = false;
      this.isRefuse = false;
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.router.onSameUrlNavigation = "reload";
      if(this.isApplicationPage == true){
        this.router.navigate([`/applications`]);
      }else{
        this.router.navigate([`/dashboard`]);
      }
    }, errorMessage => {
      console.log("errorMessage In user-match component");
      console.log(errorMessage);
    });
  }

  doRefuse() {
    let data = {
      status: new ApplicantStatusModel().MATCH_REFUSED
    }

    this.applicantService.doUpdateStatus(data, this.jobId).subscribe(resData => {
      this.isApply = false;
      this.isReject = false;
      this.isRefuse = false;
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.router.onSameUrlNavigation = "reload";
      if(this.isApplicationPage == true){
        this.router.navigate([`/applications`]);
      }else{
        this.router.navigate([`/dashboard`]);
      }
    }, errorMessage => {
      console.log("errorMessage In user-match component");
      console.log(errorMessage);
    });
  }
}

@Component({
  selector: 'app-dialog-success',
  templateUrl: 'app-dialog-success.html',
})
export class DialogSuccess {
  isApplicationPage = false;

  constructor(private router: Router) {
    if (this.router.routerState.snapshot.url.startsWith("/applications")) {
      this.isApplicationPage = true;
    }
  }

  doRefresh() {
    // location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.onSameUrlNavigation = "reload";
    if(this.isApplicationPage == true){
      this.router.navigate([`/applications`]);
    }else{
      this.router.navigate([`/dashboard`]);
    }
  }

}
