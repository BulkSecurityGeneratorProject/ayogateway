import { BaseEntity } from './../../shared';

export class LogSaldo implements BaseEntity {
    constructor(
        public id?: number,
        public idMember?: string,
        public saldo?: number,
        public act?: number,
        public tgl?: any,
        public ket?: string,
        public ref?: number,
        public tkode?: number,
        public kodetrx?: number,
        public msg?: string,
        public userInput?: string,
        public isstok?: number,
    ) {
    }
}
