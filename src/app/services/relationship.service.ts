import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Relationship } from '../interfaces/relationship';
import axios from 'axios';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class RelationshipService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  getRelationships(): Observable<Relationship[]> {
    return new Observable((observer) => {
      axios
        .get<Relationship[]>(`${this.apiUrl}parentescos`)
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
