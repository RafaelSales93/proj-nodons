import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Paciente } from '../../../shared/model/paciente';
import { Consulta } from '../../../shared/model/consulta';
import { ConsultaService } from '../../../services/consulta.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { StatusConsulta } from '../../../shared/model/statusConsulta.enum';

@Component({
  selector: 'app-nova-consulta-dialog',
  templateUrl: './consulta-dialog.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class NovaConsultaDialogComponent {
  formulario: FormGroup;
  statusOptions: string[] = ['AGENDADA', 'REALIZADA', 'CANCELADA'];

  constructor(
    private dialogRef: MatDialogRef<NovaConsultaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { paciente?: Paciente; consulta?: Consulta },
    private fb: FormBuilder,
    private consultaService: ConsultaService
  ) {
    this.formulario = this.fb.group({
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      medico: ['', Validators.required],
      status: [StatusConsulta.ABERTA , Validators.required],
    });

    if (this.data.consulta) {
      this.formulario.patchValue(this.data.consulta);
    }
  }

  salvar(): void {
    const pacienteId = this.data.consulta?.paciente?.id || this.data.paciente?.id;
  
    const novaConsulta: Consulta = {
      ...this.formulario.value,
      id: this.data.consulta?.id,
      paciente: { id: pacienteId }
    };
  
    if (novaConsulta.id) {
      this.consultaService.updateConsulta(novaConsulta).subscribe((resultado) => {
        this.dialogRef.close(resultado);
      });
    } else {
      this.consultaService.createConsulta(novaConsulta).subscribe((resultado) => {
        this.dialogRef.close(resultado);
      });
    }
  }
  
  

  cancelar(): void {
    this.dialogRef.close();
  }
}
