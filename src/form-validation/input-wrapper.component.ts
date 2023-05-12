import { CommonModule } from '@angular/common';
import { Component, ContentChild, HostBinding, inject } from '@angular/core';
import { NgModel, NgModelGroup } from '@angular/forms';
import { FormDirective } from './form.directive';

@Component({
  selector: '[inputWrapper]',
  imports: [CommonModule],
  template: `
  <ng-content></ng-content>
  <ul *ngIf="ngModel.control.errors && (form.ngForm.submitted || ngModel.touched)">
    <li *ngFor="let error of ngModel.control.errors.errors">{{error}}</li>
  </ul>
  <ng-container *ngIf="ngModelGroup && (form.ngForm.submitted || ngModelGroup.touched)">
  <ul *ngIf="ngModelGroup.control?.errors">
    <li *ngFor="let error of ngModelGroup.control.errors.errors">{{error}}</li>
  </ul>
  </ng-container>
  `,
  standalone: true,
})
export class InputWrapperComponent {
  @ContentChild(NgModel) public ngModel: NgModel;
  public readonly form = inject(FormDirective);
  public readonly ngModelGroup: NgModelGroup = inject(NgModelGroup, {
    optional: true,
    self: true,
  });

  @HostBinding('class.invalid') public get invalid() {
    console.log(this.ngModelGroup?.name)
    if (this.ngModel?.control?.errors && (this.form.ngForm.submitted || this.ngModel.touched)) {
      return true;
    }
    if( this.ngModelGroup?.control?.errors && (this.form.ngForm.submitted || this.ngModelGroup.touched)){
      return true;
    }
    return false;
  }
}
