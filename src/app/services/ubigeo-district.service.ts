import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UbigeoDistrict } from '../interfaces/ubigeo-district';
import axios from 'axios';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UbigeoDistrictService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  getUbigeoDistricts(
    codigoDepartamento: string,
    codigoProvincia: string
  ): Observable<UbigeoDistrict[]> {
    return new Observable((observer) => {
      axios
        .get<UbigeoDistrict[]>(
          `${this.apiUrl}distritos?codigoDepartamento=${codigoDepartamento}&codigoProvincia=${codigoProvincia}`
        )
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
