import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TiposDocumentoIdentidadService } from '../services/tipo-documento-identidad.service';
import { TipoDocumentoIdentidad } from '../interfaces/tipo-documento-identidad';
import { ListPatient } from '../interfaces/list-patient';
import { ListPatientService } from '../services/list-patient.service';

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
  tipoBusqueda: string = ''; // Inicializamos la propiedad aquí
  tipoDocumento: string = ''; // Propiedad para almacenar el tipo de documento seleccionado
  selectedTipoDocumentoId: number = 0;

  constructor(
    private router: Router,
    private tiposDocumentoService: TiposDocumentoIdentidadService,
    private listPatientService: ListPatientService
  ) {}

  //metodo buscar pacientes
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

      // Verificar si se ha ingresado un número de documento
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
      // Obtener el valor del nombre del input
      const nombresInput = (
        document.getElementById('nombres') as HTMLInputElement
      ).value;
      // Verificar si se ha proporcionado un nombre

      const apellidosInput = (
        document.getElementById('apellidos') as HTMLInputElement
      ).value;
      // Verificar si ambos campos están vacíos
      if (nombresInput === '' && apellidosInput === '') {
        alert('Ingresa al menos un nombre o un apellido.');
        return;
      }
      if (nombresInput.trim() !== '') {
        parametrosBusqueda.noNombres = nombresInput;
      }
      if (apellidosInput.trim() !== '') {
        // Dividir los apellidos en partes
        const partesApellidos = apellidosInput.split(' ');

        // Verificar si se han proporcionado apellidos
        if (partesApellidos.length === 1) {
          // Si solo hay un apellido, se asume que es el primer apellido
          parametrosBusqueda.noApepat = partesApellidos[0];
        } else if (partesApellidos.length > 1) {
          // Si hay más de un apellido, se asume que el primer elemento es el primer apellido
          parametrosBusqueda.noApepat = partesApellidos[0];
          // El resto de los elementos se consideran el segundo apellido
          parametrosBusqueda.noApemat = partesApellidos.slice(1).join(' ');
        }
      }
    }

    if (Object.keys(parametrosBusqueda).length === 0) {
      alert('Elige un tipo de búsqueda.');
      return;
    }
    // Mostrar los parámetros de búsqueda en la consola antes de llamar a la API
    console.log('Parámetros de búsqueda:', parametrosBusqueda);

    // Llamar a la API con los parámetros de búsqueda adecuados
    return new Promise<void>((resolve, reject) => {
      this.listPatientService.buscarPacientes(parametrosBusqueda).subscribe(
        (pacientes: ListPatient[]) => {
          this.pacientes = pacientes; // Asigna los datos de los pacientes a la matriz pacientes
          console.log('Respuesta de la API:', pacientes);
          if (pacientes.length === 0) {
            alert('No se encontraron pacientes.');
          }
          resolve(); // Resuelve la promesa si la búsqueda es exitosa
        },
        (error) => {
          console.error('Error al buscar pacientes:', error);
          reject(error); // Rechaza la promesa si hay un error
        }
      );
    });
  }

  // Método para manejar el cambio en el select
  handleTipoDocumentoChange(event: any) {
    this.selectedTipoDocumentoId = event.target.value; // Asigna el id seleccionado
    this.tipoDocumento = event.target.value; // Almacena el valor seleccionado
    const numeroDocumentoInput = document.getElementById(
      'numeroDocumento'
    ) as HTMLInputElement;

    // Verifica el tipo de documento seleccionado y ajusta el tipo de input correspondiente
    if (this.tipoDocumento === '1') {
      numeroDocumentoInput.type = 'number';
    } else {
      numeroDocumentoInput.type = 'text';
    }
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

    // Limpia el texto de los inputs
    numeroDocumentoElement.value = '';
    apellidosElement.value = '';
    nombresElement.value = '';

    // Establece la opción 1 como seleccionada en el select
    tipoDocumentoElement.selectedIndex = 0;

    // Habilitar o deshabilitar los input y select según la opción seleccionada
    if (this.tipoBusqueda === 'DI') {
      tipoDocumentoElement.removeAttribute('disabled');
      numeroDocumentoElement.removeAttribute('disabled');
      apellidosElement.setAttribute('disabled', 'true');
      nombresElement.setAttribute('disabled', 'true');

      // Obtener tipos de documento solo cuando se elija la opción "Documento de identidad"
      this.tiposDocumentoService
        .getTiposDocumentoIdentidad()
        .subscribe((data) => {
          // Filtrar los datos por estado true
          this.tiposDocumentoIdentidad = data.filter((item) => item.estado);
        });
    } else if (this.tipoBusqueda === 'ApeNom') {
      tipoDocumentoElement.setAttribute('disabled', 'true');
      numeroDocumentoElement.setAttribute('disabled', 'true');
      apellidosElement.removeAttribute('disabled');
      nombresElement.removeAttribute('disabled');
    } else {
      // Si no se selecciona nada, deshabilita todos los input y el select
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

    // Limpia el texto de los inputs
    numeroDocumentoElement.value = '';
    apellidosElement.value = '';
    nombresElement.value = '';

    // Establece la opción 1 como seleccionada en el select
    tipoDocumentoElement.selectedIndex = 0;
    tipoBusquedaElement.selectedIndex = 0;

    // Deshabilita los input y el select tipoDocumento
    tipoDocumentoElement.setAttribute('disabled', 'true');
    numeroDocumentoElement.setAttribute('disabled', 'true');
    apellidosElement.setAttribute('disabled', 'true');
    nombresElement.setAttribute('disabled', 'true');
  }

  navigateToRegisterPatient() {
    this.router.navigate(['/register-patient']);
  }
}
