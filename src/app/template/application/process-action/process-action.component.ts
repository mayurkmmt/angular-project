import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-process-action',
  templateUrl: './process-action.component.html',
  styleUrls: ['./process-action.component.scss']
})
export class ProcessActionComponent implements OnInit {
  @Input('status') status:number;
  constructor() { }

  ngOnInit() {
  }

}
