import { Component, OnInit, forwardRef, HostBinding, ViewChild, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkboxprofil',
  templateUrl: './checkboxprofil.component.html',
  styleUrls: ['./checkboxprofil.component.scss']
})
export class CheckboxprofilComponent implements OnInit {
  @ViewChild('slider', { static: true }) mySlider;

  sliderstart = "Keine Kenntnisse";
  slidervalue = this.sliderstart;
  sliderIsActive = false;

  @Input() valrating: number;


  constructor() { }   

  ngOnInit() {
  }

  changeMatslider(slider) {
    if (slider.value == 0) {
      this.slidervalue = this.sliderstart;
    }
    if (slider.value == 1) {
      this.slidervalue = "Einsteiger";
    }
    if (slider.value == 2) {
      this.slidervalue = "Profi";
    }
    if (slider.value == 3) {
      this.slidervalue = "Experte";
    }
  }

  onChange: any = () => { }
  onTouch: any = () => { }
  val = 0

  set value(val) {
    if (val !== undefined && this.val !== val) {
      this.val = val
      this.onChange(val)
      this.onTouch(val)
    }

  }

  writeValue(value: any) {
    this.mySlider.value = value
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }
}

