import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatGridListModule,
    MatToolbarModule,
  ],
  templateUrl: './home.component.html',
})
export class HomePage {
  constructor(private router: Router) {}

  irParaFluxoConsulta() {
    this.router.navigate(['/fluxo-consulta']);
  }

  irParaListagem() {
    this.router.navigate(['/listagem']);
  }
}
