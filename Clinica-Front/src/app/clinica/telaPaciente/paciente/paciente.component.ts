import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule, 
    MatStepperModule,
    MatLabel,
    MatTableModule,

  ],
})
export class PacienteComponent implements OnInit {
  formulario!: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(PacienteService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      endereco: [''],
      telefone: [''],
      email: [''],
      cpf: [''],
      sexo: [''],
      ativo: [true],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarPaciente(Number(id));
    }
  }
  carregarPaciente(id: number): void {
    this.service.getPacienteById(id).subscribe((paciente) => {
      this.formulario.patchValue(paciente);
    });
  }


  salvar(): void {
    if (this.formulario.invalid) return;

    const paciente = this.formulario.value;

    if (paciente.id) {
      this.service.updatePaciente(paciente.id, paciente).subscribe(() => {
        this.router.navigate(['/listagem']);
      });
    } else {
      this.service.createPaciente(paciente).subscribe(() => {
        this.router.navigate(['/listagem']);
      });
    }
  }

  limpar(): void {
    this.formulario.reset({ ativo: true });
  }

  cancelar(): void {
    this.router.navigate(['/listagem']);
  }
}
