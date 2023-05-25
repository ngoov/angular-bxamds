import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
import { SafeParseError, ZodError, z } from 'zod';

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

const isZodError = <T>(result: z.SafeParseReturnType<T, T>): result is SafeParseError<T> => !result.success;

export function createValidator<T>(
  field: string,
  model: T,
  schema: z.ZodType<T>
): ValidatorFn {
  return (control: AbstractControl) => {
    const result = schema.safeParse(model);
    let errors = [];
    if(isZodError(result)){
      errors = result.error.flatten().fieldErrors[field];
      console.log(`fielderrors ${field}`, result.error.issues)
      console.log(`fielderrors ${field}`, result.error.flatten().fieldErrors)
    }
    return errors ? { error: errors[0], errors } : null;
  };
}
