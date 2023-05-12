import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { ObservableState } from '../../../observable-state';
import { Person } from '../../../types/person';
import { map, Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FacadeService } from '../../../facade.service';
import { personValidations } from '../../../validations/person.validations';
import { FormDirective } from '../../../form-validation/form.directive';
import { Suite } from 'vest';
import { InputWrapperComponent } from '../../../form-validation/input-wrapper.component';
import { FormModelDirective } from '../../../form-validation/form-model.directive';
import { FormModelGroupDirective } from '../../../form-validation/form-model-group.directive';
import { State, ViewModel } from './person-detail.types';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FormModelDirective,
    FormModelGroupDirective,
    FormDirective,
    InputWrapperComponent,
  ],
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent
  extends ObservableState<State>
  implements AfterViewInit
{
  @ViewChild('form') public form: NgForm;

  public readonly suite: Suite<Person> = personValidations;
  private readonly facade = inject(FacadeService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly personId$ = this.activatedRoute.params.pipe(
    map((params) => params['id'])
  );

  // we only expose to the template what we need (not all state)
  public readonly vm$: Observable<ViewModel> = this.state$.pipe(
    map(({ form, person, people, films, species, formDirty, formValid }) => {
      const nextPersonId = this.getNextPersonId(
        people,
        this.activatedRoute.snapshot.params['id']
      );
      const previousPersonId = this.getPreviousPersonId(
        people,
        this.activatedRoute.snapshot.params['id']
      );
      return {
        name: person.name,
        form,
        films,
        species,
        formDirty,
        formValid,
        nextPersonId,
        previousPersonId,
        previousPersonButtonDisabled: !previousPersonId,
        nextPersonButtonDisabled: !nextPersonId,
        filmsDisabled: form.hair_color === 'blond',
        hideSpecies: form.name.length > 2,
      };
    })
  );

  private getNextPersonId(people: Person[], currentId: string): string | null {
    const currentIndex = people.findIndex(
      (p) => p.url === `https://swapi.dev/api/people/${currentId}/`
    );
    return people.length > currentIndex
      ? people[currentIndex + 1]?.url
          .split('/')
          .filter((v) => !!v)
          .pop()
      : null;
  }

  private getPreviousPersonId(
    people: Person[],
    currentId: string
  ): string | null {
    const currentIndex = people.findIndex(
      (p) => p.url === `https://swapi.dev/api/people/${currentId}/`
    );
    return currentIndex > 0
      ? people[currentIndex - 1]?.url
          .split('/')
          .filter((v) => !!v)
          .pop()
      : null;
  }

  constructor() {
    super();
    const { people } = this.facade.peopleObservableState.snapshot;
    this.initialize({
      person: new Person(),
      form: new Person(),
      people,
      species: [],
      films: [],
      formDirty: false,
      formValid: false,
    });

    // Connect all asynchronous stuff
    this.connect({
      ...this.facade.peopleObservableState.pick(['people']),
      person: this.personId$.pipe(
        switchMap((personId) => this.facade.getPerson(personId))
      ),
      films: this.facade.getFilms().pipe(map((resp) => resp.results)),
      species: this.facade.getSpecies().pipe(map((resp) => resp.results)),
    });
  }

  public ngAfterViewInit(): void {
    this.select('person').subscribe((v) => this.form.reset(v));
    this.connect({
      form: this.form.valueChanges.pipe(
        map((v) => new Person({ ...this.snapshot.form, ...v }))
      ),
      formDirty: this.form.statusChanges.pipe(map(() => this.form.dirty)),
      formValid: this.form.statusChanges.pipe(map(() => this.form.valid)),
    });
  }

  public submit(): void {
    console.log(this.snapshot.form);
  }

  public reset(): void {
    this.form.reset(this.snapshot.person);
  }
}
