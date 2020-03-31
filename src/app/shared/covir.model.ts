export class deltaCon {
    confirmed: number;

    constructor() {
        this.confirmed = 0;
    }
}

export class CovirResult {
    active: number;
    confirmed: number;
    deaths: number;
    lastupdatedtime: string;
    recovered: number;
    delta: deltaCon;

    constructor() {
        this.active = 0;
        this.confirmed = 0;
        this.deaths = 0;
        this.recovered = 0;
        this.lastupdatedtime = null;
        this.delta = new deltaCon();
    }
}
