export interface TransferenciaModel {
  id?: number,
  nomeUsuario: string,
  documentoUsuario: string,
  contaOrigem: number,
  contaDestino: number,
  valorTransferencia: number,
  valorTaxa?: number,
  dataHoraTransferencia: Date,
  dataHoraAgendamento: Date
}