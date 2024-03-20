import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';
import { RegisterCompanion } from '../interfaces/register-companion';

@Injectable({
  providedIn: 'root',
})
export class RegisterCompanionService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  registerCompanion(companionData: RegisterCompanion): Observable<void> {
    return new Observable<void>((observer) => {
      axios
        .post<void>(`${this.apiUrl}acompanantes/registrar`, companionData)
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
