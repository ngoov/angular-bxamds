import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
import { SuiteResult } from "vest";
import { set } from 'lodash';

export function getControlPath(
  formGroup: FormGroup,
  controlName: string,
  control: AbstractControl
): string {
  for (const key in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(key)) {
      const ctrl = formGroup.get(key);
      if (ctrl instanceof FormGroup) {
        const path = getControlPath(ctrl, controlName, control);
        if (path) {
          return key + '.' + path;
        }
      } else if (ctrl === control) {
        return key;
      }
    }
  }
  return '';
}

export function getGroupInPath(
  formGroup: FormGroup,
  controlName: string,
  control: AbstractControl
): string {
  for (const key in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(key)) {
      const ctrl = formGroup.get(key);
      if (ctrl instanceof FormGroup) {
        const path = getControlPath(ctrl, controlName, control);
        if (path) {
          return key + '.' + path;
        }
      } 
      if (ctrl === control) {
        return key;
      }
    }
  }
  return '';
}

export function createValidator<T>(
  field: string,
  model: T,
  suite: (model: T, field: string) => SuiteResult
): ValidatorFn {
  return (control: AbstractControl) => {
    const mod: T = { ...model };

    set(mod, field, control.value); // Update the property with path
    const result = suite(mod, field);
    const errors = result.getErrors()[field];
    return errors ? { error: errors[0], errors } : null;
  };
}