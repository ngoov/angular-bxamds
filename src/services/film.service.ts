import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../types/film';
import { ListResponse } from '../types/list-response';
@Injectable({ providedIn: 'root' })
export class FilmService {
  private readonly httpClient = inject(HttpClient);

  public getFilms(): Observable<ListResponse<Film>> {
    return this.httpClient.get<ListResponse<Film>>(
      `https://swapi.dev/api/films`
    );
  }
}
