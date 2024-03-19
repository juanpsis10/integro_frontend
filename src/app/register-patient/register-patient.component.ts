import { Component, ViewChild, ElementRef } from '@angular/core';
import { TiposDocumentoIdentidadService } from '../services/tipo-documento-identidad.service';
import { TipoDocumentoIdentidad } from '../interfaces/tipo-documento-identidad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

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
  // Datos del paciente
  tipoDocumentoPaciente: number | null = null;
  numeroDocumentoPaciente: string = '';
  apellidoPaternoPaciente: string = '';
  apellidoMaternoPaciente: string = '';
  nombresPaciente: string = '';
  sexoPaciente: string = '';
  fechaNacimientoPaciente: Date | null = null;
  edadPaciente: string = '';
  lugarNacimientoPaciente: string = '';
  direccionPaciente: string = '';
  departamentoPaciente: string = '';
  provinciaPaciente: string = '';
  distritoPaciente: string = '';

  // Datos del acompañante
  tipoDocumentoAcompanante: number | null = null;
  numeroDocumentoAcompanante: string = '';
  apellidoPaternoAcompanante: string = '';
  apellidoMaternoAcompanante: string = '';
  nombresAcompanante: string = '';
  fechaNacimientoAcompanante: Date | null = null;
  edadAcompanante: string = '';
  parentescoAcompanante: string = '';
  telefonoContactoAcompanante: string = '';
  direccionAcompanante: string = '';
  departamentoAcompanante: string = '';
  provinciaAcompanante: string = '';
  distritoAcompanante: string = '';

  tiposDocumentoIdentidad: TipoDocumentoIdentidad[] = [];

  constructor(private tiposDocumentoService: TiposDocumentoIdentidadService) {}

  async ngOnInit(): Promise<void> {
    await this.obtenerTiposDocumentoIdentidad();
  }

  async obtenerTiposDocumentoIdentidad(): Promise<void> {
    try {
      const data: TipoDocumentoIdentidad[] | undefined =
        await this.tiposDocumentoService
          .getTiposDocumentoIdentidad()
          .toPromise();
      // Verificar si se obtuvieron datos antes de asignarlos
      if (data) {
        // Filtrar los tipos de documento por estado true
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

  guardarDatos() {
    const campos = [
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

    let hayCamposVacios = false;

    campos.forEach((item) => {
      if (!item.valor) {
        item.campo.nativeElement.style.borderColor = 'red';
        hayCamposVacios = true;
      } else {
        item.campo.nativeElement.style.borderColor = ''; // Borra el color del borde
      }
    });

    if (hayCamposVacios) {
      alert('Todos los campos son obligatorios');
      return;
    }

    console.log('Valores de los campos:');
    campos.forEach((item) => {
      console.log(item.campo.nativeElement.id + ': ' + item.valor);
    });
  }

  // Método para manejar el cambio en la selección del tipo de documento del paciente
  onTipoDocumentoPacienteChange(event: any): void {
    this.tipoDocumentoPaciente = parseInt(event.target.value, 10);
    console.log(
      'Tipo de documento del paciente seleccionado:',
      this.tipoDocumentoPaciente
    );
  }

  // Método para manejar el cambio en la selección del tipo de documento del acompañante
  onTipoDocumentoAcompananteChange(event: any): void {
    this.tipoDocumentoAcompanante = parseInt(event.target.value, 10);
    console.log(
      'Tipo de documento del acompañante seleccionado:',
      this.tipoDocumentoAcompanante
    );
  }
}
