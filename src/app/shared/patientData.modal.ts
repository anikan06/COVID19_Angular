export class SummaryTotal {
    total: number;

    constructor() {
        this.total = 0;
    }
}

export class PatientData {
    source: string;
    lastRefreshed: string;
    summary: SummaryTotal;
    rawPatientData: [];

    constructor() {
        this.source = null;
        this.lastRefreshed = null;
        this.summary = new SummaryTotal();
        this.rawPatientData = [];
    }
}


