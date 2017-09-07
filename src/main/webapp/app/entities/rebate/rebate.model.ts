import { BaseEntity } from './../../shared';

export class Rebate implements BaseEntity {
    constructor(
        public id?: number,
        public idTransaksi?: number,
        public jml?: number,
        public hargaProduk?: number,
        public idMember?: string,
        public level?: number,
        public bulan?: number,
        public tahun?: number,
        public status?: number,
    ) {
    }
}
