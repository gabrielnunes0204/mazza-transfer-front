import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-visualizar-agenda',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './visualizar-agenda.component.html',
  styleUrl: './visualizar-agenda.component.css'
})
export class VisualizarAgendaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}