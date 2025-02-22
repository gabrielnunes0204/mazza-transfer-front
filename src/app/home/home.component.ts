import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../service/request.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TransferenciaModel } from '../model/transferencia.model';
import { interval } from 'rxjs';
import { RouterModule } from '@angular/router';
import { RetornoAgendamentoModel } from '../model/retorno-agendamento.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filtroAgendamento = {} as TransferenciaModel;
  dataHoraTransferencia: any = null;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    interval(100).subscribe(() => {
      this.validFields();
    });
  }

  createRequest(): void {

    if (!this.validFields()) {
      Swal.fire('Aviso', 'É obrigatório preencher todos os campos.', 'info');
      return;
    }

    if (!this.validAccounts()) {
      Swal.fire('Aviso', 'As contas de origem e destino devem ser diferentes.', 'info');
      return;
    }

    const dataUtc = new Date(this.dataHoraTransferencia + 'Z');
    this.filtroAgendamento.dataHoraTransferencia =
      new Date(dataUtc.getTime() - dataUtc.getTimezoneOffset() * 60000);

    this.requestService.createTransfer(this.filtroAgendamento).subscribe({
      next: (data: RetornoAgendamentoModel) => {
        if (data.isSucesso) {
          if (data.valorTaxado == 0) {
            Swal.fire('Sucesso',
              data.mensagem + '. Você não será taxado por essa transferência.', 'success');
          } else {
            Swal.fire('Sucesso',
              data.mensagem + '. Você será taxado em: R$ ' + data.valorTaxado, 'success');
          }
        } else {
          Swal.fire('Erro', data.mensagem, 'error');
        }
      },
      error: (error) => {
        Swal.fire('Erro', 'Erro ao solicitar transferência.', 'error');
        console.error('Erro ao solicitar transferência: ', error);
      },
      complete: () => {
        this.clear();
      }
    });
  }

  validFields(): boolean {
    if (!this.filtroAgendamento.nomeUsuario) {
      return false;
    }

    if (!this.filtroAgendamento.documentoUsuario) {
      return false;
    }

    if (!this.filtroAgendamento.contaOrigem) {
      return false;
    }

    if (!this.filtroAgendamento.contaDestino) {
      return false;
    }

    if (!this.filtroAgendamento.valorTransferencia) {
      return false;
    }

    if (!this.dataHoraTransferencia) {
      return false;
    }

    return true;
  }

  validAccounts(): boolean {
    if ((this.filtroAgendamento.contaOrigem && this.filtroAgendamento.contaDestino) &&
      (this.filtroAgendamento.contaOrigem === this.filtroAgendamento.contaDestino)) {
      return false;
    }

    return true;
  }

  clear() {
    this.filtroAgendamento = {} as TransferenciaModel;
    this.dataHoraTransferencia = null;
  }
}