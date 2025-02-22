import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../service/request.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TransferenciaModel } from '../model/transferencia.model';
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
  dataHoraAgendamento: any = null;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void { }

  createRequest(): void {

    if (!this.validatedFields()) {
      return;
    }

    if (!this.validAccounts()) {
      Swal.fire('Aviso', 'As contas de origem e destino devem ser diferentes.', 'info');
      return;
    }

    const dataUtc = new Date(this.dataHoraAgendamento);
    this.filtroAgendamento = {
      ...this.filtroAgendamento,
      dataHoraAgendamento: new Date(dataUtc.getTime() - dataUtc.getTimezoneOffset() * 60000)
    }

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

  validatedFields(): boolean {
    this.filtroAgendamento.contaOrigem?.toString().replace('-', '');
    this.filtroAgendamento.contaDestino?.toString().replace('-', '');

    if (!this.filtroAgendamento.nomeUsuario) {
      this.emitSwal("NOME");
      return false;
    }

    if (!this.filtroAgendamento.documentoUsuario) {
      this.emitSwal("CPF");
      return false;
    }

    if (!this.filtroAgendamento.documentoUsuario?.match("^\\d+$")) {
      Swal.fire('Aviso', 'O CPF deve ser preenchido somente com caracteres numéricos. ' +
        'Remova pontuações caso tenha inserido.', 'info');
      return false;
    }

    if (this.filtroAgendamento.documentoUsuario?.toString().length < 11) {
      Swal.fire('Aviso', 'O CPF deve conter 11 números.', 'info');
      return false;
    }

    if (!this.filtroAgendamento.contaOrigem) {
      this.emitSwal("CONTA ORIGEM");
      return false;
    }

    if (!this.filtroAgendamento.contaOrigem?.toString().match("^\\d+$")) {
      Swal.fire('Aviso', 'A conta origem deve ser preenchida somente com caracteres numéricos. ' +
        'Remova quaisquer caracteres especiais que tiver inserido.', 'info');
      return false;
    }

    if (!this.filtroAgendamento.contaDestino) {
      this.emitSwal("CONTA DESTINO");
      return false;
    }

    if (!this.filtroAgendamento.contaDestino?.toString().match("^\\d+$")) {
      Swal.fire('Aviso', 'A conta destino deve ser preenchida somente com caracteres numéricos. ' +
        'Remova quaisquer caracteres especiais que tiver inserido.', 'info');
      return false;
    }

    if (!this.filtroAgendamento.valorTransferencia) {
      this.emitSwal("VALOR TRANSFERÊNCIA");
      return false;
    }

    if (!this.dataHoraAgendamento) {
      this.emitSwal("DATA/HORA AGENDAMENTO");
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

  emitSwal(text: string) {
    Swal.fire('Aviso', 'O campo ' + text + ' deve ser preenchido.', 'info');
  }

  clear() {
    this.filtroAgendamento = {} as TransferenciaModel;
    this.dataHoraAgendamento = null;
  }
}