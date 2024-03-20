import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';
import { DeletePatient } from '../interfaces/delete-patient';

@Injectable({
  providedIn: 'root',
})
export class DeletePatientService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  deletePatient(idPaciente: number): Observable<void> {
    return new Observable<void>((observer) => {
      axios
        .delete<void>(`${this.apiUrl}paciente/eliminar/${idPaciente}`)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
