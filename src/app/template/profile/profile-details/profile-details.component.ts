import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
// import { A } from 'src/app/classes/profile';
import {ApplicantProfileModel} from "../../../models/applicant-profile.model";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  profil: ApplicantProfileModel [];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  //  this.getProfils();
  }

  /*getProfils(): void {
    this.profilService.getProfils()
    .subscribe(profile => this.profile = profile);
  }*/

}
