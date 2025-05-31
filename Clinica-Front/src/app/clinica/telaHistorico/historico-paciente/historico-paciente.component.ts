import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../../shared/model/paciente';
import { StatusConsulta } from '../../../shared/model/statusConsulta.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Historico } from '../../../shared/model/historico';
import { HistoricoService } from '../../../services/historico.service';

@Component({
  selector: 'app-historico-paciente',
  standalone: true,
  templateUrl: './historico-paciente.component.html',
  styleUrls: ['./historico-paciente.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class HistoricoPacienteComponent implements OnInit {
  @Input() paciente!: Paciente;

  public historicos: Historico[] = [];
  public historicosFiltrados: Historico[] = [];
  public filtroNome: string = '';
  public filtroStatus: string = '';

  public displayedColumns: string[] = [
    'id',
    'descricao',
    'data',
    'ativo',
  ];
  

  statusLabel: { [key: string]: string } = {
    [StatusConsulta.ABERTA]: 'Aberta',
    [StatusConsulta.CONCLUIDA]: 'Concluída',
    [StatusConsulta.CANCELADA]: 'Cancelada',
    [StatusConsulta.AGENDADO]: 'Agendada',
  };

  statusOptions = Object.values(StatusConsulta);

  constructor(
    private readonly historicoService: HistoricoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.historicos = this.route.snapshot.data['historico'] || [];
    console.log(this.historicos)
    this.historicosFiltrados = [...this.historicos];
  }
  

  // carregarHistorico(pacienteId: number): void {
  //   this.historicoService.getHistoricosByPacienteId(pacienteId).subscribe((historicos) => {
  //     console.log('Historicos:', historicos);
  //   });
  // }
}
