import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RequestService } from '../service/request.service';
import { TransferenciaModel } from '../model/transferencia.model';
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

  listaTransfer = [] as TransferenciaModel[];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getTransfer();
  }

  getTransfer(): void {
    this.requestService.getTransfers().subscribe({
      next: (data: any) => {
        console.log('Dados recebidos: ', data);
        this.listaTransfer = data;
      },
      error: (error) => {
        Swal.fire('Erro', 'Erro ao buscar as transferências.', 'error');
        console.error('Erro ao buscar as transferências: ', error);
      },
      complete: () => { }
    });
  }

  somatoriaTaxaTransferencia(valorTransferencia?: number, valorTaxa?: number): number {
    return (valorTransferencia ?? 0) + (valorTaxa ?? 0);
  }
}
