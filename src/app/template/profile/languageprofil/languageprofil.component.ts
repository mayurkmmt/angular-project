import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-languageprofil',
  templateUrl: './languageprofil.component.html',
  styleUrls: ['./languageprofil.component.scss']
})
export class LanguageprofilComponent{
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
