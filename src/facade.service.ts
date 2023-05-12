import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmService } from './services/film.service';
import { PersonService } from './services/person.service';
import { SpeciesService } from './services/species.service';
import { StarshipService } from './services/starship.service';
import { VehicleService } from './services/vehicle.service';
import { PeopleObservableState } from './state/people.state';
import { Film } from './types/film';
import { ListResponse } from './types/list-response';
import { Person } from './types/person';
import { Species } from './types/species';
import { Starship } from './types/starship';
import { Vehicle } from './types/vehicle';

@Injectable({ providedIn: 'root' })
export class FacadeService {
  public readonly peopleObservableState = inject(PeopleObservableState);
  private readonly personService = inject(PersonService);
  private readonly speciesService = inject(SpeciesService);
  private readonly starshipService = inject(StarshipService);
  private readonly vehicleService = inject(VehicleService);
  private readonly filmService = inject(FilmService);

  public getPerson(id: string): Observable<Person> {
    return this.personService.getPerson(id);
  }

  public getVehicles(): Observable<ListResponse<Vehicle>> {
    return this.vehicleService.getVehicles();
  }

  public getPeople(): Observable<ListResponse<Person>> {
    return this.personService.getPeople();
  }

  public getStarships(): Observable<ListResponse<Starship>> {
    return this.starshipService.getStarships();
  }

  public getFilms(): Observable<ListResponse<Film>> {
    return this.filmService.getFilms();
  }
  public getSpecies(): Observable<ListResponse<Species>> {
    return this.speciesService.getSpecies();
  }
}
