import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TiposDocumentoIdentidadService } from '../services/tipo-documento-identidad.service';
import { TipoDocumentoIdentidad } from '../interfaces/tipo-documento-identidad';
import { ListPatient } from '../interfaces/list-patient';
import { ListPatientService } from '../services/list-patient.service';
import { DeleteCompanionService } from '../services/delete-companion.service';
import { DeletePatientService } from '../services/delete-patient.service';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.css',
})
export class ListPatientComponent {
  pacientes: ListPatient[] = [];
  tiposDocumentoIdentidad: TipoDocumentoIdentidad[] = [];
  tipoBusqueda: string = '';
  tipoDocumento: string = '';
  selectedTipoDocumentoId: number = 0;

  constructor(
    private router: Router,
    private tiposDocumentoService: TiposDocumentoIdentidadService,
    private listPatientService: ListPatientService,
    private deletePatientService: DeletePatientService,
    private deleteCompanionService: DeleteCompanionService
  ) {}

  async buscarPacientes() {
    const tipoBusqueda = (
      document.getElementById('tipoBusqueda') as HTMLSelectElement
    ).value;

    let parametrosBusqueda: any = {};

    if (tipoBusqueda === 'DI') {
      if (this.selectedTipoDocumentoId === 0) {
        alert('Elige un tipo de documento.');
        return;
      }

      const numeroDocumento = (
        document.getElementById('numeroDocumento') as HTMLInputElement
      ).value;
      if (!numeroDocumento.trim()) {
        alert('Ingresa un número de documento.');
        return;
      }

      parametrosBusqueda.idTipoDocide = this.selectedTipoDocumentoId;
      parametrosBusqueda.noDocide = numeroDocumento;
    } else if (tipoBusqueda === 'ApeNom') {
      const nombresInput = (
        document.getElementById('nombres') as HTMLInputElement
      ).value;

      const apellidosInput = (
        document.getElementById('apellidos') as HTMLInputElement
      ).value;
      if (nombresInput === '' && apellidosInput === '') {
        alert('Ingresa al menos un nombre o un apellido.');
        return;
      }
      if (nombresInput.trim() !== '') {
        parametrosBusqueda.noNombres = nombresInput;
      }
      if (apellidosInput.trim() !== '') {
        const partesApellidos = apellidosInput.split(' ');

        if (partesApellidos.length === 1) {
          parametrosBusqueda.noApepat = partesApellidos[0];
        } else if (partesApellidos.length > 1) {
          parametrosBusqueda.noApepat = partesApellidos[0];
          parametrosBusqueda.noApemat = partesApellidos.slice(1).join(' ');
        }
      }
    }

    if (Object.keys(parametrosBusqueda).length === 0) {
      alert('Elige un tipo de búsqueda.');
      return;
    }
    console.log('Parámetros de búsqueda:', parametrosBusqueda);

    return new Promise<void>((resolve, reject) => {
      this.listPatientService.buscarPacientes(parametrosBusqueda).subscribe(
        (pacientes: ListPatient[]) => {
          this.pacientes = pacientes;
          console.log('Respuesta de la API:', pacientes);
          if (pacientes.length === 0) {
            alert('No se encontraron pacientes.');
          }
          resolve();
        },
        (error) => {
          console.error('Error al buscar pacientes:', error);
          reject(error);
        }
      );
    });
  }

  handleTipoDocumentoChange(event: any) {
    this.selectedTipoDocumentoId = event.target.value;
    this.tipoDocumento = event.target.value;
    const numeroDocumentoInput = document.getElementById(
      'numeroDocumento'
    ) as HTMLInputElement;
  }

  handleChange(event: any) {
    this.selectedTipoDocumentoId = 0;
    this.tipoBusqueda = event.target.value;

    const tipoDocumentoElement = document.getElementById(
      'tipoDocumento'
    ) as HTMLSelectElement;
    const numeroDocumentoElement = document.getElementById(
      'numeroDocumento'
    ) as HTMLInputElement;
    const apellidosElement = document.getElementById(
      'apellidos'
    ) as HTMLInputElement;
    const nombresElement = document.getElementById(
      'nombres'
    ) as HTMLInputElement;

    numeroDocumentoElement.value = '';
    apellidosElement.value = '';
    nombresElement.value = '';

    tipoDocumentoElement.selectedIndex = 0;

    if (this.tipoBusqueda === 'DI') {
      tipoDocumentoElement.removeAttribute('disabled');
      numeroDocumentoElement.removeAttribute('disabled');
      apellidosElement.setAttribute('disabled', 'true');
      nombresElement.setAttribute('disabled', 'true');

      this.tiposDocumentoService
        .getTiposDocumentoIdentidad()
        .subscribe((data) => {
          this.tiposDocumentoIdentidad = data.filter((item) => item.estado);
        });
    } else if (this.tipoBusqueda === 'ApeNom') {
      tipoDocumentoElement.setAttribute('disabled', 'true');
      numeroDocumentoElement.setAttribute('disabled', 'true');
      apellidosElement.removeAttribute('disabled');
      nombresElement.removeAttribute('disabled');
    } else {
      tipoDocumentoElement.setAttribute('disabled', 'true');
      numeroDocumentoElement.setAttribute('disabled', 'true');
      apellidosElement.setAttribute('disabled', 'true');
      nombresElement.setAttribute('disabled', 'true');
    }
  }

  limpiarCampos() {
    const tipoDocumentoElement = document.getElementById(
      'tipoDocumento'
    ) as HTMLSelectElement;
    const numeroDocumentoElement = document.getElementById(
      'numeroDocumento'
    ) as HTMLInputElement;
    const apellidosElement = document.getElementById(
      'apellidos'
    ) as HTMLInputElement;
    const nombresElement = document.getElementById(
      'nombres'
    ) as HTMLInputElement;
    const tipoBusquedaElement = document.getElementById(
      'tipoBusqueda'
    ) as HTMLSelectElement;

    this.selectedTipoDocumentoId = 0;

    numeroDocumentoElement.value = '';
    apellidosElement.value = '';
    nombresElement.value = '';

    tipoDocumentoElement.selectedIndex = 0;
    tipoBusquedaElement.selectedIndex = 0;

    tipoDocumentoElement.setAttribute('disabled', 'true');
    numeroDocumentoElement.setAttribute('disabled', 'true');
    apellidosElement.setAttribute('disabled', 'true');
    nombresElement.setAttribute('disabled', 'true');
  }

  eliminarPaciente(idPaciente: number) {
    console.log('ID del paciente a eliminar:', idPaciente);

    this.deletePatientService.deletePatient(idPaciente).subscribe(
      () => {
        console.log('Paciente eliminado exitosamente');

        this.deleteCompanionService.deleteCompanion(idPaciente).subscribe(
          () => {
            console.log('Acompañante eliminado exitosamente');
            this.pacientes = this.pacientes.filter(
              (paciente) => paciente.idPaciente !== idPaciente
            );
          },
          (error) => {
            console.error('Error al eliminar el acompañante:', error);
          }
        );
      },
      (error) => {
        console.error('Error al eliminar el paciente:', error);
      }
    );
  }

  editarPaciente(idPaciente: number) {
    this.router.navigate(['/edit-patient', idPaciente]);
  }

  navigateToRegisterPatient() {
    this.router.navigate(['/register-patient']);
  }
}
