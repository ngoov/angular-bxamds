import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from '../types/list-response';
import { Species } from '../types/species';
@Injectable({ providedIn: 'root' })
export class SpeciesService {
  private readonly httpClient = inject(HttpClient);

  public getSpecies(): Observable<ListResponse<Species>> {
    return this.httpClient.get<ListResponse<Species>>(
      `https://swapi.dev/api/species`
    );
  }
}
