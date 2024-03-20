// delete-companion.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';
import { DeleteCompanion } from '../interfaces/delete-companion';

@Injectable({
  providedIn: 'root',
})
export class DeleteCompanionService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  deleteCompanion(idPaciente: number): Observable<void> {
    return new Observable<void>((observer) => {
      axios
        .delete<void>(`${this.apiUrl}acompanante/eliminar/${idPaciente}`)
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
