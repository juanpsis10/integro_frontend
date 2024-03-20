import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UbigeoProvince } from '../interfaces/ubigeo-province';
import axios from 'axios';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UbigeoProvinceService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  getProvinces(codigoDepartamento: string): Observable<UbigeoProvince[]> {
    return new Observable((observer) => {
      axios
        .get<UbigeoProvince[]>(`${this.apiUrl}provincias/${codigoDepartamento}`)
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
