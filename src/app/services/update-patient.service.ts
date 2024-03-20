import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../enviroment/enviroment';
import { UpdatePatient } from '../interfaces/update-patient';

@Injectable({
  providedIn: 'root',
})
export class UpdatePatientService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  updatePatient(updateData: UpdatePatient): Observable<any> {
    return new Observable((observer) => {
      axios
        .put<any>(`${this.apiUrl}editar-paciente`, null, {
          params: {
            idPaciente: updateData.idPaciente,
            codigoUbigeo: updateData.codigoUbigeo,
            apellidoMaterno: updateData.apellidoMaterno,
            idSexo: updateData.idSexo,
            direccion: updateData.direccion,
            lugarNacimiento: updateData.lugarNacimiento,
            codigoAsegurado: updateData.codigoAsegurado,
            numeroDocumento: updateData.numeroDocumento,
            idTipoDocumento: updateData.idTipoDocumento,
            fechaNacimiento: updateData.fechaNacimiento
              .toISOString()
              .split('T')[0],
            nombres: updateData.nombres,
            apellidoPaterno: updateData.apellidoPaterno,
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
