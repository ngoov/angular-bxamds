import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FacadeService } from '../facade.service';
import { ObservableState } from '../observable-state';
import { PeopleState } from '../state/people.state';
import { map, Observable } from 'rxjs';
import { Person } from '../types/person';

type AppComponentState = Pick<PeopleState, 'people'| 'peopleLoading'>

type ViewModel =  Pick<AppComponentState, 'peopleLoading'> & {
  people: (Person & {id: string})[]
}
@Component({
  selector: 'app',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <ng-container *ngIf="vm$|async as vm">
    <span *ngIf="vm.peopleLoading">Loading people</span>
    <ul>
      <li *ngFor="let person of vm.people">
        <a [routerLink]="['/people', person.id]">{{person.name}}</a>
      </li>
    </ul>
    <a [routerLink]="['/add-user']">Add user</a>

  <router-outlet></router-outlet>
  </ng-container>
  `,
})
export class AppComponent extends ObservableState<AppComponentState> {
  private readonly facade = inject(FacadeService);

  public readonly vm$: Observable<ViewModel> = this.state$.pipe(
    map(({people, peopleLoading }) =>{
      return {
        people: people.map(person => {
          return {...person, id: person.url.split('/').filter(v => !!v).pop()}
        }),
        peopleLoading
      }
    })
  );
  constructor(){
    super();
    const {people, peopleLoading} = this.facade.peopleObservableState.snapshot;
    this.initialize({
      people,
      peopleLoading
    })
    this.connect({
      ...this.facade.peopleObservableState.pick(['people', 'peopleLoading'])
    })
  }
}
