import { BaseEntity } from './../../shared';

export class MemberHp implements BaseEntity {
    constructor(
        public id?: number,
        public idMember?: string,
        public hp?: string,
        public typeim?: number,
        public istrx?: number,
        public crypt?: string,
        public typemsg?: number,
        public member?: BaseEntity,
    ) {
    }
}
