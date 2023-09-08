import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-educationprofil',
  templateUrl: './educationprofil.component.html',
  styleUrls: ['./educationprofil.component.scss']
})
export class EducationprofilComponent implements OnInit {
  clickMessage = '';
  visible = true;
  selectable = false;
  removable = false;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  eduCtrl = new FormControl();
  filterededu: Observable<string[]>;
  edu: string[] = ['Elektroniker (m/w/d)'];
  alledu: string[] = ['Elektroniker (m/w/d)', 'Industriemechaniker (m/w/d)', 'Kfz-Mechatroniker (m/w/d)', 'Mechaniker (m/w/d)', 'Mechatroniker (m/w/d)', 'Sonstiges Ausbildung' ];

  @ViewChild('chipInput', { static: true }) chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: true }) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filterededu = this.eduCtrl.valueChanges.pipe(
      startWith(null),
      map((edu: string | null) => edu ? this._filter(edu) : this.alledu.slice()));
  }

  showContent() {
    this.selectable = true;
    this.removable = true;
  }

  hideContent() {
    this.selectable = false;
    this.removable = false;
    console.log(this.selectable)
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.edu.push(value.trim());
      }
      if (input) {
        input.value = '';
      }

      this.eduCtrl.setValue(null);
    }
  }

  remove(edu: string): void {
    const index = this.edu.indexOf(edu);

    if (index >= 0) {
      this.edu.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.edu.includes(event.option.viewValue)) {
      this.edu.push(event.option.viewValue);
    }

    this.chipInput.nativeElement.value = '';
    this.eduCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();
    return this.alledu.filter(edu => edu.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
  }

}
