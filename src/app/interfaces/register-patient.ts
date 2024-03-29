export interface RegisterPatient {
  idTipoDocumento: number;
  numeroDocumento: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  idSexo: number;
  fechaNacimiento: Date;
  lugarNacimiento: string;
  direccion: string;
  codigoUbigeo: string;
  estado: number;
  codigoAsegurado: string;
}
