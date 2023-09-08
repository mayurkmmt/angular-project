import { Component,  forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';


@Component({
  selector: 'rating-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})

export class CheckboxComponent implements ControlValueAccessor {
  @ViewChild('slider', { static: true }) mySlider: MatSlider;

  sliderStart = "Keine Kenntnisse";
  sliderValueName = this.sliderStart;
  sliderIsActive = false;
  sliderValue = 0;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    if (this.mySlider.value < 3) {
      this.mySlider.value = this.mySlider.value + 1;
    } else {
      this.mySlider.value = 0;
    }
    this.changeMatSlider(this.mySlider);
  }

  changeMatSlider(slider) {
    if (slider.value == 0) {
      this.sliderValueName = this.sliderStart;
    }
    if (slider.value == 1) {
      this.sliderValueName = "Grundkenntnisse";
    }
    if (slider.value == 2) {
      this.sliderValueName = "fließend";
    }
    if (slider.value == 3) {
      this.sliderValueName = "Muttersprache";
    }
    this.propagateChange(this.mySlider.value);
  }

  onChange: any = () => { }
  onTouch: any = () => { }
  val = 0

  public writeValue(value: any) {
    if (value !== undefined) {
      this.mySlider.value = value;
      this.changeMatSlider(this.mySlider);
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() { };
  private propagateChange = (_: any) => { };
}
