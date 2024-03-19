import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListPatient } from '../interfaces/list-patient'; // Importa la interfaz
import axios from 'axios';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ListPatientService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  buscarPacientes(params: any): Observable<ListPatient[]> {
    return new Observable((observer) => {
      axios
        .get<ListPatient[]>(`${this.apiUrl}pacientes/buscar`, { params })
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
