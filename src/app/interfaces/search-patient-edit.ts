export interface SearchPatientEdit {
  idPaciente: number;
  codigoUbigeo: string;
  apellidoMaterno: string;
  idSexo: number;
  estado: boolean;
  direccion: string;
  lugarNacimiento: string;
  codigoAsegurado: string;
  numeroDocumentoIdentidad: string;
  idTipoDocumentoIdentidad: number;
  fechaNacimiento: Date;
  nombres: string;
  apellidoPaterno: string;
}
