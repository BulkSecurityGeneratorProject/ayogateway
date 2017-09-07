import { BaseEntity } from './../../shared';

export class Denom implements BaseEntity {
    constructor(
        public id?: number,
        public jmlDenom?: number,
    ) {
    }
}
