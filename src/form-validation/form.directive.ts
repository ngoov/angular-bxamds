import { Directive, inject, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  selector: 'form[model]',
  standalone: true,
})
export class FormDirective<T> implements OnChanges {
  private readonly formChanges$$ = new Subject<void>();
  public readonly formChanges$ = this.formChanges$$.asObservable();
  @Input() public model: T;
  @Input() public suite: (model: T, field: string) => SuiteResult;

  public readonly ngForm = inject(NgForm, { self: true });

  public ngOnChanges(): void {
    this.formChanges$$.next();
  }
}
