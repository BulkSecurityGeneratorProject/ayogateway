import { BaseEntity } from './../../shared';

export class Harga implements BaseEntity {
    constructor(
        public id?: number,
        public idHarga?: number,
        public idProduk?: number,
        public idMember?: string,
        public hargaJual?: number,
        public tglInput?: any,
        public userInput?: string,
        public hargaBefore?: number,
    ) {
    }
}
