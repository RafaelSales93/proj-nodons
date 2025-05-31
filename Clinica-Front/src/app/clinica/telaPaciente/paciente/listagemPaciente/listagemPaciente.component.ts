import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../../services/paciente.service';
import { Paciente } from '../../../../shared/model/paciente';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagemPaciente.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
  ],
})
export class ListagemComponent implements OnInit {
  pacientes: Paciente[] = [];
  colunasExibidas: string[] = ['nome', 'cpf', 'telefone', 'acoes'];
  filtroForm!: FormGroup;

  constructor(
    private readonly pacienteService: PacienteService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    const atualizado = navigation?.extras?.state?.['atualizado'];
    if (atualizado) {
      this.carregarPacientes();
    }
  }
  

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      nome: [''],
      cpf: [''],
    });

    this.carregarPacientes();
  }

  carregarPacientes(): void {
    this.pacienteService.getPacientes().subscribe((data) => {
      this.pacientes = data;
    });
  }

  aplicarFiltro(): void {
    const { nome, cpf } = this.filtroForm.value;

    this.pacienteService.getPacientes().subscribe((data) => {
      this.pacientes = data.filter((p) => {
        const nomeMatch = nome ? p.nome?.toLowerCase().includes(nome.toLowerCase()) : true;
        const cpfMatch = cpf ? p.cpf?.includes(cpf) : true;
        return nomeMatch && cpfMatch;
      });
    });
  }

  editarPaciente(id: number): void {
    this.router.navigate(['/paciente', id]);
  }
  

  novoPaciente(): void {
    this.router.navigate(['/paciente']);
  }
  
}
