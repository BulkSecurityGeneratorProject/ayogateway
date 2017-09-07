import { BaseEntity } from './../../shared';

export class Operator implements BaseEntity {
    constructor(
        public id?: number,
        public idOperator?: number,
        public nama?: string,
    ) {
    }
}
