import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UbigeoDepartament } from '../interfaces/ubigeo-departament';
import axios from 'axios';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UbigeoDepartamentService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  getUbigeoDepartaments(): Observable<UbigeoDepartament[]> {
    return new Observable((observer) => {
      axios
        .get<UbigeoDepartament[]>(`${this.apiUrl}ubigeo-departamentos`)
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
