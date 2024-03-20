import { Component, ViewChild, ElementRef } from '@angular/core';
import { TiposDocumentoIdentidadService } from '../services/tipo-documento-identidad.service';
import { TipoDocumentoIdentidad } from '../interfaces/tipo-documento-identidad';
import { Sex } from '../interfaces/sex';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { SexService } from '../services/sex.service';
import { from } from 'rxjs';
import { Relationship } from '../interfaces/relationship';
import { RelationshipService } from '../services/relationship.service';
import { UbigeoDepartament } from '../interfaces/ubigeo-departament';
import { UbigeoDepartamentService } from '../services/ubigeo-departament.service';
import { UbigeoProvince } from '../interfaces/ubigeo-province';
import { UbigeoProvinceService } from '../services/ubigeo-province.service';
import { UbigeoDistrict } from '../interfaces/ubigeo-district';
import { UbigeoDistrictService } from '../services/ubigeo-district.service';
import { RegisterPatient } from '../interfaces/register-patient';
import { RegisterPatientService } from '../services/register-patient.service';
import { RegisterCompanion } from '../interfaces/register-companion';
import { RegisterCompanionService } from '../services/register-companion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.css',
})
export class RegisterPatientComponent {
  @ViewChild('tipoDocumento') tipoDocumento!: ElementRef<HTMLSelectElement>;
  @ViewChild('numeroDocumento') numeroDocumento!: ElementRef;
  @ViewChild('apellidoPaterno') apellidoPaterno!: ElementRef;
  @ViewChild('apellidoMaterno') apellidoMaterno!: ElementRef;
  @ViewChild('nombres') nombres!: ElementRef;
  @ViewChild('sexo') sexo!: ElementRef<HTMLSelectElement>;
  @ViewChild('fechaNacimiento') fechaNacimiento!: ElementRef;
  @ViewChild('edad') edad!: ElementRef;
  @ViewChild('lugarNacimiento') lugarNacimiento!: ElementRef;
  @ViewChild('direccion') direccion!: ElementRef;
  @ViewChild('departamento') departamento!: ElementRef<HTMLSelectElement>;
  @ViewChild('provincia') provincia!: ElementRef<HTMLSelectElement>;
  @ViewChild('distrito') distrito!: ElementRef<HTMLSelectElement>;

  @ViewChild('tipoDocumentoComp')
  tipoDocumentoComp!: ElementRef<HTMLSelectElement>;
  @ViewChild('numeroDocumentoComp') numeroDocumentoComp!: ElementRef;
  @ViewChild('apellidoPaternoComp') apellidoPaternoComp!: ElementRef;
  @ViewChild('apellidoMaternoComp') apellidoMaternoComp!: ElementRef;
  @ViewChild('nombresComp') nombresComp!: ElementRef;
  @ViewChild('fechaNacimientoComp') fechaNacimientoComp!: ElementRef;
  @ViewChild('edadComp') edadComp!: ElementRef;
  @ViewChild('parentescoComp') parentescoComp!: ElementRef<HTMLSelectElement>;
  @ViewChild('telfComp') telfComp!: ElementRef;
  @ViewChild('direccionComp') direccionComp!: ElementRef;
  @ViewChild('departamentoComp')
  departamentoComp!: ElementRef<HTMLSelectElement>;
  @ViewChild('provinciaComp') provinciaComp!: ElementRef<HTMLSelectElement>;
  @ViewChild('distritoComp') distritoComp!: ElementRef<HTMLSelectElement>;

  tipoDocumentoPaciente: number | null = null;

  tipoDocumentoAcompanante: number | null = null;

  tiposDocumentoIdentidad: TipoDocumentoIdentidad[] = [];
  sexs: Sex[] = [];
  relationships: Relationship[] = [];
  ubigeoDepartaments: UbigeoDepartament[] = [];
  ubigeoProvinces: UbigeoProvince[] = [];
  ubigeoDistricts: UbigeoDistrict[] = [];
  ubigeoProvincesComp: UbigeoProvince[] = [];
  ubigeoDistrictsComp: UbigeoDistrict[] = [];

  showCompanionModule: boolean = false;
  cancelButtonClass: string = '';
  idPacienteRegistrado: number = 0;

  constructor(
    private router: Router,
    private tiposDocumentoService: TiposDocumentoIdentidadService,
    private sexService: SexService,
    private relationshipsService: RelationshipService,
    private ubigeoDepartamentsService: UbigeoDepartamentService,
    private ubigeoProvincesService: UbigeoProvinceService,
    private ubigeoDistrictsService: UbigeoDistrictService,
    private registerPatientService: RegisterPatientService,
    private registerCompanionService: RegisterCompanionService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.obtenerTiposDocumentoIdentidad();
    await this.obtenerSexos();
    await this.obtenerParentescos();
    await this.obtenerDepartamentos();
  }

  async obtenerTiposDocumentoIdentidad(): Promise<void> {
    try {
      const data: TipoDocumentoIdentidad[] | undefined =
        await this.tiposDocumentoService
          .getTiposDocumentoIdentidad()
          .toPromise();

      if (data) {
        this.tiposDocumentoIdentidad = data.filter((item) => item.estado);
      } else {
        console.error(
          'No se obtuvieron datos de tipos de documento de identidad.'
        );
      }
    } catch (error) {
      console.error('Error al obtener tipos de documento de identidad:', error);
    }
  }

  async obtenerDepartamentos(): Promise<void> {
    try {
      const data: any[] | undefined = await this.ubigeoDepartamentsService
        .getUbigeoDepartaments()
        .toPromise();

      if (data) {
        this.ubigeoDepartaments = data
          .map((item) => {
            return {
              nombre: item[0],
              codigo: item[1],
              estado: item[2],
            };
          })

          .filter((departamento) => departamento.estado);
      } else {
        console.error(
          'No se obtuvieron datos de tipos de documento de identidad.'
        );
      }
    } catch (error) {
      console.error('Error al obtener tipos de documento de identidad:', error);
    }
  }

  async obtenerParentescos(): Promise<void> {
    try {
      const data: Relationship[] | undefined = await this.relationshipsService
        .getRelationships()
        .toPromise();

      if (data) {
        this.relationships = data.filter((item) => item.activo);
      } else {
        console.error(
          'No se obtuvieron datos de tipos de documento de identidad.'
        );
      }
    } catch (error) {
      console.error('Error al obtener tipos de documento de identidad:', error);
    }
  }

  async obtenerSexos(): Promise<void> {
    try {
      const data: Sex[] | undefined = await this.sexService
        .getSexs()
        .toPromise();

      if (data) {
        this.sexs = data.filter((item) => item.estado);
      } else {
        console.error('No se obtuvieron datos de tipos de sexo.');
      }
    } catch (error) {
      console.error('Error al obtener tipos de sexo:', error);
    }
  }

  guardarDatos() {
    const camposPaciente = [
      {
        campo: this.tipoDocumento,
        valor: this.tipoDocumento.nativeElement.value,
      },
      {
        campo: this.numeroDocumento,
        valor: this.numeroDocumento.nativeElement.value,
      },
      {
        campo: this.apellidoPaterno,
        valor: this.apellidoPaterno.nativeElement.value,
      },
      {
        campo: this.apellidoMaterno,
        valor: this.apellidoMaterno.nativeElement.value,
      },
      { campo: this.nombres, valor: this.nombres.nativeElement.value },
      { campo: this.sexo, valor: this.sexo.nativeElement.value },
      {
        campo: this.fechaNacimiento,
        valor: this.fechaNacimiento.nativeElement.value,
      },
      { campo: this.edad, valor: this.edad.nativeElement.value },
      {
        campo: this.lugarNacimiento,
        valor: this.lugarNacimiento.nativeElement.value,
      },
      { campo: this.direccion, valor: this.direccion.nativeElement.value },
      {
        campo: this.departamento,
        valor: this.departamento.nativeElement.value,
      },
      { campo: this.provincia, valor: this.provincia.nativeElement.value },
      { campo: this.distrito, valor: this.distrito.nativeElement.value },
    ];

    let hayCamposPacienteVacios = false;
    let hayCamposAcompananteVacios = false;
    let camposAcompanante: any[] = [];

    camposPaciente.forEach((item) => {
      if (!item.valor) {
        item.campo.nativeElement.style.borderColor = 'red';
        hayCamposPacienteVacios = true;
      } else {
        item.campo.nativeElement.style.borderColor = '';
      }
    });

    if (this.showCompanionModule) {
      const camposAcompanante = [
        {
          campo: this.tipoDocumentoComp,
          valor: this.tipoDocumentoComp.nativeElement.value,
        },
        {
          campo: this.numeroDocumentoComp,
          valor: this.numeroDocumentoComp.nativeElement.value,
        },
        {
          campo: this.apellidoPaternoComp,
          valor: this.apellidoPaternoComp.nativeElement.value,
        },
        {
          campo: this.apellidoMaternoComp,
          valor: this.apellidoMaternoComp.nativeElement.value,
        },
        {
          campo: this.nombresComp,
          valor: this.nombresComp.nativeElement.value,
        },
        {
          campo: this.fechaNacimientoComp,
          valor: this.fechaNacimientoComp.nativeElement.value,
        },
        { campo: this.edadComp, valor: this.edadComp.nativeElement.value },
        {
          campo: this.parentescoComp,
          valor: this.parentescoComp.nativeElement.value,
        },
        { campo: this.telfComp, valor: this.telfComp.nativeElement.value },
        {
          campo: this.direccionComp,
          valor: this.direccionComp.nativeElement.value,
        },
        {
          campo: this.departamentoComp,
          valor: this.departamentoComp.nativeElement.value,
        },
        {
          campo: this.provinciaComp,
          valor: this.provinciaComp.nativeElement.value,
        },
        {
          campo: this.distritoComp,
          valor: this.distritoComp.nativeElement.value,
        },
      ];

      camposAcompanante.forEach((item) => {
        if (!item.valor) {
          item.campo.nativeElement.style.borderColor = 'red';
          hayCamposAcompananteVacios = true;
        } else {
          item.campo.nativeElement.style.borderColor = '';
        }
      });
    }

    if (this.showCompanionModule) {
      if (hayCamposPacienteVacios || hayCamposAcompananteVacios) {
        alert('Todos los datos del paciente y acompañante son requeridos');
        return;
      }
    } else {
      if (hayCamposPacienteVacios) {
        alert('Todos los datos del paciente son requeridos');
        return;
      }
    }

    const codigoAsegurado = this.generarCodigoAsegurado();

    const paciente: RegisterPatient = {
      idTipoDocumento: parseInt(this.tipoDocumento.nativeElement.value),
      numeroDocumento: this.numeroDocumento.nativeElement.value,
      apellidoPaterno: this.apellidoPaterno.nativeElement.value,
      apellidoMaterno: this.apellidoMaterno.nativeElement.value,
      nombres: this.nombres.nativeElement.value,
      idSexo: parseInt(this.sexo.nativeElement.value),
      fechaNacimiento: new Date(this.fechaNacimiento.nativeElement.value),
      lugarNacimiento: this.lugarNacimiento.nativeElement.value,
      direccion: this.direccion.nativeElement.value,
      codigoUbigeo:
        this.departamento.nativeElement.value.toString() +
        this.provincia.nativeElement.value.toString() +
        this.distrito.nativeElement.value.toString(),
      estado: 1,
      codigoAsegurado: codigoAsegurado,
    };

    this.registerPatientService.registerPatient(paciente).subscribe(
      (idPaciente) => {
        this.idPacienteRegistrado = idPaciente;
        console.log('Paciente registrado con ID:', idPaciente);

        if (this.showCompanionModule) {
          const acompanante: RegisterCompanion = {
            idPaciente: this.idPacienteRegistrado,
            idTipoDocumento: parseInt(
              this.tipoDocumentoComp.nativeElement.value
            ),
            numeroDocumento: this.numeroDocumentoComp.nativeElement.value,
            apellidoPaterno: this.apellidoPaternoComp.nativeElement.value,
            apellidoMaterno: this.apellidoMaternoComp.nativeElement.value,
            nombres: this.nombresComp.nativeElement.value,
            fechaNacimiento: new Date(
              this.fechaNacimientoComp.nativeElement.value
            ),
            idParentesco: parseInt(this.parentescoComp.nativeElement.value),
            telefonoContacto: this.telfComp.nativeElement.value,
            direccion: this.direccionComp.nativeElement.value,
            codigoUbigeo:
              this.departamento.nativeElement.value.toString() +
              this.provincia.nativeElement.value.toString() +
              this.distrito.nativeElement.value.toString(),
          };

          this.registerCompanionService
            .registerCompanion(acompanante)
            .subscribe(
              () => {
                console.log('Acompañante y paciente registrado con éxito');
                this.limpiarCampos();
              },
              (error) => {
                console.error('Error al registrar el acompañante:', error);
              }
            );
        } else {
          console.log('Paciente registrado con éxito');
          this.limpiarCampos();
        }
      },
      (error) => {
        console.error('Error al registrar el paciente:', error);
      }
    );
  }

  generarCodigoAsegurado(): string {
    const numeroDocumento = this.numeroDocumento.nativeElement.value.toString();
    const primerosDosCaracteres = numeroDocumento.slice(0, 2);
    const primerCaracterApellidoPaterno =
      this.apellidoPaterno.nativeElement.value.charAt(0);
    const primerCaracterApellidoMaterno =
      this.apellidoMaterno.nativeElement.value.charAt(0);
    const primerCaracterNombres = this.nombres.nativeElement.value.charAt(0);
    const dosUltimosCaracteres = numeroDocumento.slice(-2);

    return `${primerosDosCaracteres}${primerCaracterApellidoPaterno}${primerCaracterApellidoMaterno}${primerCaracterNombres}${dosUltimosCaracteres}`;
  }

  onTipoDocumentoPacienteChange(event: any): void {
    this.tipoDocumentoPaciente = parseInt(event.target.value, 10);
    console.log(
      'Tipo de documento del paciente seleccionado:',
      this.tipoDocumentoPaciente
    );
  }

  onTipoDocumentoAcompananteChange(event: any): void {
    this.tipoDocumentoAcompanante = parseInt(event.target.value, 10);
    console.log(
      'Tipo de documento del acompañante seleccionado:',
      this.tipoDocumentoAcompanante
    );
  }

  onChangeDepartamento(event: any): void {
    this.provincia.nativeElement.disabled = false;
    this.distrito.nativeElement.disabled = true;

    this.provincia.nativeElement.value = '';
    this.distrito.nativeElement.value = '';

    console.log('valor de depatamento' + this.departamento.nativeElement.value);

    const codigoDepartamento = event.target.value;

    this.ubigeoProvincesService.getProvinces(codigoDepartamento).subscribe(
      (provinciasData: any[]) => {
        if (provinciasData) {
          this.ubigeoProvinces = provinciasData
            .map((provinciaItem) => {
              return {
                nombre: provinciaItem[0],
                codigo: provinciaItem[1],
                estado: provinciaItem[2],
              };
            })

            .filter((provincia) => provincia.estado);
        } else {
          console.error('No se obtuvieron datos de provincias.');
        }
      },
      (error) => {
        console.error('Error al obtener provincias:', error);
      }
    );
  }

  onChangeProvincia(event: any): void {
    this.distrito.nativeElement.disabled = false;

    this.distrito.nativeElement.value = '';

    const codigoDepartamento = this.departamento.nativeElement.value;
    const codigoProvincia = this.provincia.nativeElement.value;

    this.ubigeoDistrictsService
      .getUbigeoDistricts(codigoDepartamento, codigoProvincia)
      .subscribe(
        (distritosData: any[]) => {
          if (distritosData) {
            this.ubigeoDistricts = distritosData
              .map((distritoItem) => {
                return {
                  nombre: distritoItem[0],
                  codigo: distritoItem[1],
                  estado: distritoItem[2],
                };
              })

              .filter((distrito) => distrito.estado);
          } else {
            console.error('No se obtuvieron datos de distritos.');
          }
        },
        (error) => {
          console.error('Error al obtener distritos:', error);
        }
      );
  }

  onChangeDepartamentoComp(event: any): void {
    this.provinciaComp.nativeElement.disabled = false;
    this.distritoComp.nativeElement.disabled = true;

    this.provinciaComp.nativeElement.value = '';
    this.distritoComp.nativeElement.value = '';

    const codigoDepartamento = event.target.value;

    this.ubigeoProvincesService.getProvinces(codigoDepartamento).subscribe(
      (provinciasData: any[]) => {
        if (provinciasData) {
          this.ubigeoProvincesComp = provinciasData
            .map((provinciaItem) => {
              return {
                nombre: provinciaItem[0],
                codigo: provinciaItem[1],
                estado: provinciaItem[2],
              };
            })

            .filter((provincia) => provincia.estado);
        } else {
          console.error('No se obtuvieron datos de provincias.');
        }
      },
      (error) => {
        console.error('Error al obtener provincias:', error);
      }
    );
  }

  onChangeProvinciaComp(event: any): void {
    this.distritoComp.nativeElement.disabled = false;

    this.distritoComp.nativeElement.value = '';

    const codigoDepartamento = this.departamentoComp.nativeElement.value;
    const codigoProvincia = event.target.value;

    this.ubigeoDistrictsService
      .getUbigeoDistricts(codigoDepartamento, codigoProvincia)
      .subscribe(
        (distritosData: any[]) => {
          if (distritosData) {
            this.ubigeoDistrictsComp = distritosData
              .map((distritoItem) => {
                return {
                  nombre: distritoItem[0],
                  codigo: distritoItem[1],
                  estado: distritoItem[2],
                };
              })

              .filter((distrito) => distrito.estado);
          } else {
            console.error('No se obtuvieron datos de distritos.');
          }
        },
        (error) => {
          console.error('Error al obtener distritos:', error);
        }
      );
  }

  onInputTelf(event: any): void {
    const input = event.target.value;

    const sanitizedInput = input.replace(/[^0-9,]/g, '');

    event.target.value = sanitizedInput;
  }
  calcularEdad(): void {
    const fechaNacimiento = this.fechaNacimiento.nativeElement.value;
    if (fechaNacimiento) {
      const fechaNacimientoDate = new Date(fechaNacimiento);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
      const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
      if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())
      ) {
        edad--;
      }
      this.edad.nativeElement.value = edad.toString();
    }
  }

  calcularEdadComp(): void {
    const fechaNacimiento = this.fechaNacimientoComp.nativeElement.value;
    if (fechaNacimiento) {
      const fechaNacimientoDate = new Date(fechaNacimiento);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
      const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
      if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())
      ) {
        edad--;
      }
      this.edadComp.nativeElement.value = edad.toString();
    }
  }

  toggleCompanionModule(): void {
    this.showCompanionModule = !this.showCompanionModule;
    this.cancelButtonClass = this.showCompanionModule ? 'cancel-button' : '';
  }

  clearCompanionData(): void {
    this.tipoDocumentoComp.nativeElement.value = '';
    this.numeroDocumentoComp.nativeElement.value = '';
    this.apellidoPaternoComp.nativeElement.value = '';
    this.apellidoMaternoComp.nativeElement.value = '';
    this.nombresComp.nativeElement.value = '';
    this.fechaNacimientoComp.nativeElement.value = '';
    this.edadComp.nativeElement.value = '';

    this.departamentoComp.nativeElement.value = '';
    this.provinciaComp.nativeElement.value = '';
    this.distritoComp.nativeElement.value = '';
  }

  limpiarCampos(): void {
    this.tipoDocumento.nativeElement.value = '';
    this.numeroDocumento.nativeElement.value = '';
    this.apellidoPaterno.nativeElement.value = '';
    this.apellidoMaterno.nativeElement.value = '';
    this.nombres.nativeElement.value = '';
    this.sexo.nativeElement.value = '';
    this.fechaNacimiento.nativeElement.value = '';
    this.edad.nativeElement.value = '';
    this.lugarNacimiento.nativeElement.value = '';
    this.direccion.nativeElement.value = '';
    this.departamento.nativeElement.value = '';
    this.provincia.nativeElement.value = '';
    this.distrito.nativeElement.value = '';

    if (this.showCompanionModule) {
      this.tipoDocumentoComp.nativeElement.value = '';
      this.numeroDocumentoComp.nativeElement.value = '';
      this.apellidoPaternoComp.nativeElement.value = '';
      this.apellidoMaternoComp.nativeElement.value = '';
      this.nombresComp.nativeElement.value = '';
      this.fechaNacimientoComp.nativeElement.value = '';
      this.edadComp.nativeElement.value = '';
      this.parentescoComp.nativeElement.value = '';
      this.telfComp.nativeElement.value = '';
      this.direccionComp.nativeElement.value = '';

      this.departamentoComp.nativeElement.value = '';
      this.provinciaComp.nativeElement.value = '';
      this.distritoComp.nativeElement.value = '';
    }
  }
  cancelar(): void {
    this.limpiarCampos();

    this.router.navigate(['/list-patient']);
  }
}
