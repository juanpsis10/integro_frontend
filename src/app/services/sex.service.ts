import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sex } from '../interfaces/sex';
import axios from 'axios';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SexService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  getSexs(): Observable<Sex[]> {
    return new Observable((observer) => {
      axios
        .get<Sex[]>(`${this.apiUrl}sexos`)
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
