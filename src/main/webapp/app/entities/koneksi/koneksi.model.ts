import { BaseEntity } from './../../shared';

export class Koneksi implements BaseEntity {
    constructor(
        public id?: number,
        public metode?: number,
        public ket?: string,
    ) {
    }
}
