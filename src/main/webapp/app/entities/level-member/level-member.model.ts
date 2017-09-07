import { BaseEntity } from './../../shared';

export class LevelMember implements BaseEntity {
    constructor(
        public id?: number,
        public kodeLevel?: string,
        public nama?: string,
    ) {
    }
}
