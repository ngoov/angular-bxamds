import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AddressComponent } from '../../../components/ui/address/address.component';
import { ObservableState } from '../../../observable-state';
import { User, userSchema } from '../../../types/user';
import { FormDirective } from '../../../form-validation/form.directive';
import { InputWrapperComponent } from '../../../form-validation/input-wrapper.component';
import { FormModelGroupDirective } from '../../../form-validation/form-model-group.directive';
import { FormModelDirective } from '../../../form-validation/form-model.directive';
import { z } from 'zod';

export type AddUserState = {
  form: User;
  formDirty: boolean;
  formValid: boolean;
  street: string;
  passwordDisabled: boolean;
};
export type ViewModel = Pick<AddUserState, 'form' | 'formDirty' | 'formValid' | 'passwordDisabled'>;

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, FormModelGroupDirective, InputWrapperComponent, FormDirective, FormModelDirective, ReactiveFormsModule, CommonModule, AddressComponent],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent
  extends ObservableState<AddUserState>
  implements AfterViewInit
{
  @ViewChild('form') public form: NgForm;
  public readonly vm$: Observable<ViewModel> = this.state$;
  public readonly suite: z.ZodType<User> = userSchema;
  constructor() {
    super();
    this.initialize({
      form: {
        firstName: '',
        lastName: '',
        address: {
          street: ''
        },
        passwords: {
          password: 'passwork',
          confirmPassword: ''
        }
      },
      formDirty: false,
      formValid: true,
      street: '',
      passwordDisabled: false
    });
    this.onlySelectWhen(['street']).subscribe((street) => (
      console.log('do something special because street has changed', street)
    ))
  }

  public submit(): void {
    console.log(this.snapshot.form);
  }

  public ngAfterViewInit(): void {
    this.connect({
      street: this.select('form').pipe(
        map(form => form.address.street),
      ),
      passwordDisabled: this.select('street').pipe(map(street => street === '')),
      form: this.form.valueChanges.pipe(
        map((v) => ({ ...this.snapshot.form, ...v }))
      ),
      formDirty:
        this.form.statusChanges.pipe(map(() => this.form.dirty)),
      formValid:
        this.form.statusChanges.pipe(map(() => this.form.valid)),
    });
  }
}
