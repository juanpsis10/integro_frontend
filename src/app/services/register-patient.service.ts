import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';
import { RegisterPatient } from '../interfaces/register-patient';

@Injectable({
  providedIn: 'root',
})
export class RegisterPatientService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  registerPatient(patientData: RegisterPatient): Observable<number> {
    return new Observable<number>((observer) => {
      axios
        .post<number>(`${this.apiUrl}pacientes/registrar`, patientData)
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
