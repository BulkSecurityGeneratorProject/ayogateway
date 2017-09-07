import { BaseEntity } from './../../shared';

export class Produk implements BaseEntity {
    constructor(
        public id?: number,
        public idProduk?: number,
        public kodeProduk?: string,
        public idKartu?: number,
        public denom?: number,
        public hpp?: number,
        public hargaMan?: number,
        public status?: number,
        public gangguan?: number,
        public idDistributor?: number,
        public fisik?: number,
        public tglUpdate?: any,
        public userUpdate?: string,
        public idDistributor2?: number,
        public konversiSaldo?: number,
        public isreport?: number,
        public issplit?: number,
        public ototimeopen?: string,
        public ototimeclose?: string,
        public idDistributor3?: number,
        public isstok?: number,
        public otoclosestatus?: number,
        public saldoMin?: number,
        public akses?: number,
        public hlr?: number,
        public isulang?: number,
        public isurut?: number,
        public formatppob?: number,
        public jenisppob?: number,
        public ketproduk?: string,
    ) {
    }
}
