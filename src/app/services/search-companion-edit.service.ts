import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchCompanionEdit } from '../interfaces/search-companion-edit';
import axios from 'axios';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SearchCompanionEditService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  getCompanionData(idPaciente: number): Observable<SearchCompanionEdit> {
    return new Observable((observer) => {
      axios
        .get<SearchCompanionEdit>(
          `${this.apiUrl}acompanante/editar/buscar/${idPaciente}`
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
