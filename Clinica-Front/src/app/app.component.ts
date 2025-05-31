import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, CommonModule, MatMenuModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clinica-front';
}
