import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TiposDocumentoIdentidadService } from '../services/tipo-documento-identidad.service';
import { TipoDocumentoIdentidad } from '../interfaces/tipo-documento-identidad';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.css',
})
export class ListPatientComponent {
  tiposDocumentoIdentidad: TipoDocumentoIdentidad[] = [];
  tipoBusqueda: string = ''; // Inicializamos la propiedad aquí
  tipoDocumento: string = ''; // Propiedad para almacenar el tipo de documento seleccionado

  constructor(
    private router: Router,
    private tiposDocumentoService: TiposDocumentoIdentidadService
  ) {}

  // Método para manejar el cambio en el select
  handleTipoDocumentoChange(event: any) {
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
