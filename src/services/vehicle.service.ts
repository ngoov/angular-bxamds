import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from '../types/list-response';
import { Vehicle } from '../types/vehicle';
@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly httpClient = inject(HttpClient);

  public getVehicles(): Observable<ListResponse<Vehicle>> {
    return this.httpClient.get<ListResponse<Vehicle>>(
      `https://swapi.dev/api/vehicles`
    );
  }
}
