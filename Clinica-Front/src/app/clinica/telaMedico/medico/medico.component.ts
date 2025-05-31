import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../../services/medico.service';

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
  selector: 'app-medico',
  templateUrl: './medico.component.html',
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
export class MedicoComponent implements OnInit {
  formulario!: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(MedicoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      crm: [''],
      ativo: [true],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarMedico(Number(id));
    }
  }
  carregarMedico(id: number): void {
    this.service.getMedicoById(id).subscribe((medico) => {
      this.formulario.patchValue(medico);
    });
  }


  salvar(): void {
    if (this.formulario.invalid) return;

    const medico = this.formulario.value;

    if (medico.id) {
      this.service.updateMedico(medico.id, medico).subscribe(() => {
        this.router.navigate(['/listagem']);
      });
    } else {
      this.service.createMedico(medico).subscribe(() => {
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
