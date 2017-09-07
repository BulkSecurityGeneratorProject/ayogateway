import { BaseEntity } from './../../shared';

export class SmsHistory implements BaseEntity {
    constructor(
        public id?: number,
        public tglInput?: any,
        public noHp?: string,
        public nama?: string,
        public pesan?: string,
        public tipe?: number,
        public tglSms?: any,
        public com?: string,
        public report?: number,
        public trx?: number,
        public posting?: number,
        public ref?: string,
        public msisdn?: string,
        public enginename?: string,
        public ip?: string,
        public typemsg?: number,
        public idMember?: string,
    ) {
    }
}
