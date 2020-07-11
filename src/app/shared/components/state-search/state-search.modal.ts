export class StateDetailsFil {
    name: string;
    details: SubDisDetails[];

    constructor() {
        this.name = null;
        this.details = [];
    }
}

export class SubDisDetails {
    name: string;
    details: Det;

    constructor() {
        this.name = null;
        this.details = new Det();
    }
}

export class Det {
    active: number;
    confirmed: number;
    recovered: number;
    delta: Cnf;

    constructor() {
        this.active = 0;
        this.confirmed = 0;
        this.recovered = 0;
        this.delta = new Cnf();
    }
}

export class Cnf {
    confirmed: number;

    constructor () {
        this.confirmed = 0;
    }
}