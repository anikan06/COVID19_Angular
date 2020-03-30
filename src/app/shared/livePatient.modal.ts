import { PatientData } from './patientData.modal';

export class LivePatient {
    success: boolean;
    data: PatientData;
    lastRefreshed: string;
    lastOriginUpdate: string;

    constructor() {
        this.success = false;
        this.data = new PatientData();
        this.lastRefreshed = null;
        this.lastOriginUpdate = null;
    }
}
