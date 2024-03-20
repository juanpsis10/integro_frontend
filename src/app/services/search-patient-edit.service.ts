import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchPatientEdit } from '../interfaces/search-patient-edit';
import axios from 'axios';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SearchPatientEditService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  getPatientData(idPaciente: number): Observable<SearchPatientEdit> {
    return new Observable((observer) => {
      axios
        .get<SearchPatientEdit>(
          `${this.apiUrl}paciente/editar/buscar/${idPaciente}`
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
