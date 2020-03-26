import { CovirResult } from './covir.model';

export class DistrictDetails {
    name: string;
    details: CovirResult;

    constructor() {
        this.name = null;
        this.details = new CovirResult();
    }
}
