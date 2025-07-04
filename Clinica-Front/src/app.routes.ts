import { ConsultaComponent } from './app/clinica/telaConsulta/consulta-dialog/consulta.ts/consulta.component';
import { PacienteComponent } from './app/clinica/telaPaciente/paciente/paciente.component';
import { Routes } from '@angular/router';
import { HomePage } from './app/clinica/home/home.component';
import { ListagemComponent } from './app/clinica/telaPaciente/paciente/listagemPaciente/listagemPaciente.component';
import {HistoricoPacienteComponent} from './app/clinica/telaHistorico/historico-paciente/historico-paciente.component';
import { historicoResolver } from './app/clinica/telaHistorico/historico-paciente/historico.resolver';
import { MedicoComponent } from './app/clinica/telaMedico/medico/medico.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'home', component: HomePage },
  { path: 'paciente', component: PacienteComponent },
  { path: 'medico', component: MedicoComponent},
  { path: 'consulta', component: ConsultaComponent },
  { path: 'listagem', component: ListagemComponent },

  { path: 'paciente/:id',loadComponent: () => import('./app/clinica/telaPaciente/paciente/paciente.component').then(m => m.PacienteComponent) },  
  { path: '**', redirectTo: '' },

  { 
    path: 'historico',
    component: HistoricoPacienteComponent,
    resolve: {
      historico: historicoResolver
    }
  },
];
