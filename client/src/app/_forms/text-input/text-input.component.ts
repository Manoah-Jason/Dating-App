import { NgIf } from '@angular/common';
import { Component, Self, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.less'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
    // Implement writeValue method as needed
  }

  registerOnChange(fn: any): void {
    // Implement registerOnChange method as needed
  }

  registerOnTouched(fn: any): void {
    // Implement registerOnTouched method as needed
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement setDisabledState method as needed
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
