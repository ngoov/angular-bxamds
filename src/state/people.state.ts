import { inject, Injectable } from "@angular/core";
import { PersonService } from "../services/person.service";
import { ObservableState } from "../observable-state";
import { Person } from "../types/person";
import { map, tap } from "rxjs";

export type PeopleState = {
  people: Person[];
  peopleLoading: boolean;
}

@Injectable({providedIn: 'root'})
export class PeopleObservableState extends ObservableState<PeopleState> {
  private readonly personService = inject(PersonService);
  constructor() {
    super();
    this.initialize({
      people: [],
      peopleLoading: true
    })
    this.connect({
      people: this.personService.getPeople().pipe(
        map(v => v.results),
        tap(() => this.patch({peopleLoading: false}))
      )
    })
  }
}