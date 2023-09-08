import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartComponent implements OnInit {

  constructor(private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    let snackBarRef =  this._snackBar.open('Schon einen Account?', 'Zum Login', {
      duration: 7000
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate([`/login`]);
    })
  }

  redirectToRegister(){
    this.router.navigate([`/register`]);
  }



}
