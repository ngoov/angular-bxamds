import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { InputWrapperComponent } from '../../../form-validation/input-wrapper.component';
import { FormModelDirective } from '../../../form-validation/form-model.directive';
import { FormModelGroupDirective } from '../../../form-validation/form-model-group.directive';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  imports: [CommonModule, InputWrapperComponent, FormModelGroupDirective, FormModelDirective, FormsModule],
  standalone: true,
  styleUrls: ['./address.component.scss'],
  // #region ViewProviders
  /* 
   * BIG TROUBLE WITHOUT THIS VIEWPROVIDER
   * True for Reactive Forms as well.
   * See Kara's talk: https://youtu.be/CD_t3m2WMM8?t=1826
   * See also formViewProvider in this project
   * COMMENT OUT to see:
   * - NgForm has no controls! Controls are detached from the form.
   * - Form-level status values (touched, valid, etc.) no longer change
   * - Controls still validate, update model, and update their statuses
   */
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  // #endregion
})
export class AddressComponent {
  @Input() public street: string;
  @Input() public number: string;
  @Input() public city: string;
  @Input() public zipcode: string;
  @Input() public country: string;
}