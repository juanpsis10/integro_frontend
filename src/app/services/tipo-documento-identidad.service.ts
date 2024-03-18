import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumentoIdentidad } from '../interfaces/tipo-documento-identidad'; // Importa la interfaz
import axios from 'axios';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class TiposDocumentoIdentidadService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  getTiposDocumentoIdentidad(): Observable<TipoDocumentoIdentidad[]> {
    return new Observable((observer) => {
      axios
        .get<TipoDocumentoIdentidad[]>(
          `${this.apiUrl}tipos-documento-identidad`
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
