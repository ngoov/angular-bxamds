import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from '../types/list-response';
import { Starship } from '../types/starship';
@Injectable({ providedIn: 'root' })
export class StarshipService {
  private readonly httpClient = inject(HttpClient);

  public getStarships(): Observable<ListResponse<Starship>> {
    return this.httpClient.get<ListResponse<Starship>>(
      `https://swapi.dev/api/starships`
    );
  }
}
