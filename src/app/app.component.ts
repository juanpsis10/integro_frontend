import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module'; // Importar AppModule aquí
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { ListPatientComponent } from './list-patient/list-patient.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppModule,
    RegisterPatientComponent,
    ListPatientComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend_reto_tecnico';
}
