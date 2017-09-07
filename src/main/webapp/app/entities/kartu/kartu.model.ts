import { BaseEntity } from './../../shared';

export class Kartu implements BaseEntity {
    constructor(
        public id?: number,
        public idKartu?: number,
        public nama?: string,
        public idOperator?: number,
        public cekHlr?: number,
        public ketkartu?: string,
    ) {
    }
}
