import { BaseEntity } from './../../shared';

export class Transaksi implements BaseEntity {
    constructor(
        public id?: number,
        public tglTransaksi?: any,
        public idMember?: string,
        public nama?: string,
        public jml?: number,
        public kodeTrx?: number,
        public status?: number,
        public saldoAwal?: number,
        public saldoAkhir?: number,
        public ket?: string,
        public tglInput?: any,
        public userInput?: string,
        public isstok?: number,
    ) {
    }
}
