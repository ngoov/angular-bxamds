import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListResponse } from '../types/list-response';
import { Person } from '../types/person';
@Injectable({ providedIn: 'root' })
export class PersonService {
  private readonly httpClient = inject(HttpClient);

  public getPerson(id: string): Observable<Person> {
    return this.httpClient.get<Person>(`https://swapi.dev/api/people/${id}`);
  }
  public getPeople(): Observable<ListResponse<Person>> {
    return this.httpClient.get<ListResponse<Person>>(`https://swapi.dev/api/people`)
  }
}
