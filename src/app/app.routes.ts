import { Routes } from '@angular/router';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list-patient', pathMatch: 'full' },
  { path: 'list-patient', component: ListPatientComponent },
  { path: 'register-patient', component: RegisterPatientComponent },
  { path: 'edit-patient/:id', component: EditPatientComponent },
];
