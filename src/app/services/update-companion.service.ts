import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../enviroment/enviroment';
import { UpdateCompanion } from '../interfaces/update-companion';

@Injectable({
  providedIn: 'root',
})
export class UpdateCompanionService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  updateCompanion(data: UpdateCompanion): Observable<any> {
    return new Observable((observer) => {
      axios
        .put<any>(`${this.apiUrl}editar-acompanante`, null, {
          params: {
            idPaciente: data.idPaciente,
            codigoUbigeo: data.codigoUbigeo,
            apellidoMaterno: data.apellidoMaterno,
            fechaNacimiento: data.fechaNacimiento,
            idTipoDocumentoIdentidad: data.idTipoDocumentoIdentidad,
            nombres: data.nombres,
            idParentesco: data.idParentesco,
            numeroDocumentoIdentidad: data.numeroDocumentoIdentidad,
            direccion: data.direccion,
            telefonoContacto: data.telefonoContacto,
            apellidoPaterno: data.apellidoPaterno,
          },
        })
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
