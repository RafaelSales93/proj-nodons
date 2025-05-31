import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../shared/model/medico';
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
  templateUrl: './listagemMedico.component.html',
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
  medico: Medico[] = [];
  colunasExibidas: string[] = ['nome', 'crm', 'acoes'];
  filtroForm!: FormGroup;

  constructor(
    private readonly medicoService: MedicoService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    const atualizado = navigation?.extras?.state?.['atualizado'];
    if (atualizado) {
      this.carregarMedico();
    }
  }
  

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      nome: [''],
      crm: [''],
    });

    this.carregarMedico();
  }

  carregarMedico(): void {
    this.medicoService.getMedicos().subscribe((data) => {
      this.medico = data;
    });
  }

  aplicarFiltro(): void {
    const { nome, crm } = this.filtroForm.value;

    this.medicoService.getMedicos().subscribe((data) => {
      this.medico = data.filter((p) => {
        const nomeMatch = nome ? p.nome?.toLowerCase().includes(nome.toLowerCase()) : true;
        const crmMatch = crm ? p.crm?.includes(crm) : true;
        return nomeMatch && crmMatch;
      });
    });
  }

  editarMedico(id: number): void {
    this.router.navigate(['/medico', id]);
  }
  

  novoMedico(): void {
    this.router.navigate(['/medico']);
  }
  
}
