import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skillprofil',
  templateUrl: './skillprofil.component.html',
  styleUrls: ['./skillprofil.component.scss']
})
export class SkillprofilComponent  {

  visible = false;
  valrating: number;  
  

  constructor() { }


  showContent(valrating: number): void {
    this.visible = true;
    this.valrating = valrating;
  }

  hideContent(){
    this.visible = false;
  }

}

