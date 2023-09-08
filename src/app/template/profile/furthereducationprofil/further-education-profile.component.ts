import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete } from '@angular/material/autocomplete';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-further-education-profile',
  templateUrl: './further-education-profile.component.html',
  styleUrls: ['./further-education-profile.component.scss'],

})
export class FurtherEducationProfileComponent {
  clickMessage = '';
  visible = true;
  selectable = false;
  removable = false;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  furthereduCtrl = new FormControl();
  filteredFurtheredu: Observable<string[]>;
  furtheredu: string[] = ['Techniker'];
  allFurtheredu: string[] = ['Ausbilder', 'Meister', 'Techniker', 'Prozessmanager'];

  @ViewChild('chipInput', { static: true }) chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: true }) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredFurtheredu = this.furthereduCtrl.valueChanges.pipe(
      startWith(null),
      map((furtheredu: string | null) => furtheredu ? this._filter(furtheredu) : this.allFurtheredu.slice()));
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
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.furtheredu.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.furthereduCtrl.setValue(null);
    }
  }

  remove(furtheredu: string): void {
    const index = this.furtheredu.indexOf(furtheredu);

    if (index >= 0) {
      this.furtheredu.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.furtheredu.includes(event.option.viewValue)) {
      this.furtheredu.push(event.option.viewValue);
    }

    this.chipInput.nativeElement.value = '';
    this.furthereduCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();
    return this.allFurtheredu.filter(furtheredu => furtheredu.toLowerCase().indexOf(filterValue) === 0);
  }
}
