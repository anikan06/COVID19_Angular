export class StateTestData {
    name: string;
    tested: TestData;

    constructor() {
        this.name = null;
        this.tested = new TestData();
    }
}

export class TestData {
    negative: string;
    numcallsstatehelpline: string;
    numicubeds: string;
    numisolationbeds: string;
    numventilators: string;
    positive: string;
    source: string;
    source2: string;
    state: string;
    totalpeopleinquarantine: string;
    totalpeoplereleasedfromquarantine: string;
    totaltested: string;
    unconfirmed: string;
    updatedon: string;

    constructor() {
        this.negative = null;
        this.numcallsstatehelpline = null;
        this.numicubeds = null;
        this.numisolationbeds = null;
        this.numventilators = null;
        this.positive = null;
        this.source = null;
        this.source2 = null;
        this.state = null;
        this.totalpeopleinquarantine = null;
        this.totalpeoplereleasedfromquarantine = null;
        this.totaltested = null;
        this.unconfirmed = null;
        this.updatedon = null;
    }
}