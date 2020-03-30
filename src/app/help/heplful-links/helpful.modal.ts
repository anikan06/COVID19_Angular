export class NotifyArray {
    title: string;
    link: string;

    constructor() {
        this.title = null;
        this.link = null;
    }
}

export class Notify {
    notifications: Array<NotifyArray>;

    constructor() {
        this.notifications = [];
    }
}



export class HelpfulLinks {
    success: boolean;
    data: Notify;
    lastRefreshed: string;
    lastOriginUpdate: string;

    constructor() {
        this.success = true;
        this.data = new Notify();
        this.lastRefreshed = null;
        this.lastOriginUpdate = null;
    }
}