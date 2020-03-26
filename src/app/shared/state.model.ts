import { DistrictDetails } from './district.model';

export class StateDetails {
    name: string;
    details: Array<DistrictDetails>;

    constructor() {
        this.name = null;
        this.details = [];
    }
}
