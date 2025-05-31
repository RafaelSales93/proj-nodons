import { Historico } from '../../../../shared/model/historico';
import { HistoricoService } from '../../../../services/historico.service';
import { StatusConsulta } from '../../../../shared/model/statusConsulta.enum';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PacienteService } from '../../../../services/paciente.service';
import { ConsultaService } from '../../../../services/consulta.service';
import { Paciente } from '../../../../shared/model/paciente';
import { Consulta } from '../../../../shared/model/consulta';
import { NovaConsultaDialogComponent } from '../consulta-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
  ],
})
export class ConsultaComponent implements OnInit {
  formulario!: FormGroup;
  pacientes: Paciente[] = [];
  pacienteSelecionado!: Paciente | null;
  pacientesFiltrados$!: any;
  istorico: Historico[] = [];
  consultas: Consulta[] = [];
  displayedColumns = ['id', 'data', 'paciente', 'descricao', 'status', 'acoes'];

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private consultaService: ConsultaService,
    private dialog: MatDialog,
    private router: Router,
    public historicoService: HistoricoService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      paciente: [''],
    });

    this.pacienteService.getPacientes().subscribe((pacientes) => {
      this.pacientes = pacientes;
      this.formulario.get('paciente')!.setValue(this.pacientes);
    });

    this.pacientesFiltrados$ = this.formulario.get('paciente')!.valueChanges;
  }

  exibirNomePaciente(paciente: Paciente): string {
    return paciente ? paciente.nome : '';
  }

  buscarPaciente(): void {
    this.pacienteSelecionado = this.formulario.value.paciente;
    if (this.pacienteSelecionado?.id) {
      this.consultaService
        .getConsultasByPaciente(this.pacienteSelecionado.id)
        .subscribe((consultas) => {
          this.consultas = consultas;
        });
    }
  }

  abrirNovaConsulta(): void {
    const dialogRef = this.dialog.open(NovaConsultaDialogComponent, {
      width: '500px',
      data: { paciente: this.pacienteSelecionado },
    });

    dialogRef.afterClosed().subscribe((novaConsulta: Consulta | null) => {
      if (novaConsulta) {
        this.buscarPaciente();
      }
    });
  }

  editarConsulta(consulta: Consulta): void {
    const dialogRef = this.dialog.open(NovaConsultaDialogComponent, {
      width: '500px',
      data: { consulta },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.buscarPaciente();
      }
    });
  }

  cancelarConsulta(consulta: Consulta): void {
    this.consultaService.deleteConsulta(consulta.id!).subscribe(() => {
      this.buscarPaciente();
    });
  }

  alterarStatus(consulta: Consulta): void {
    let novoStatus: StatusConsulta;

    switch (consulta.status) {
      case StatusConsulta.AGENDADO:
        novoStatus = StatusConsulta.ABERTA;
        break;
      case StatusConsulta.ABERTA:
        novoStatus = StatusConsulta.CONCLUIDA;
        break;
      case StatusConsulta.CONCLUIDA:
        novoStatus = StatusConsulta.CANCELADA;
        break;
      default:
        novoStatus = StatusConsulta.AGENDADO;
    }

    const consultaAtualizada: Consulta = {
      ...consulta,
      status: novoStatus,
    };

    this.consultaService.updateConsulta(consultaAtualizada).subscribe(() => {
      this.buscarPaciente();
    });
  }
  historicoPaciente(consulta: Consulta): void {
    this.router.navigate(['/historico'], { queryParams: { id: consulta.id } });
  }

  getPacienteNome(id: number | undefined): string {
    return this.pacientes.find((p) => p.id === id)?.nome || '---';
  }

  voltarParaHome(): void {
    this.router.navigate(['/home']);
  }
}
