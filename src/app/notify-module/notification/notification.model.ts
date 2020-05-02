export class NotifyData {
    link: string;
    title: string;

    constructor() {
        this.link = null;
        this.title = null;
    }
}
export class Notifications {
    notifications: Array<NotifyData>;

    constructor() {
        this.notifications = [];
    }

}

export class Notify {
    data: Notifications;
    lastOriginUpdate: string;
    lastRefreshed: string;
    success: boolean;

    constructor() {
        this.data = new Notifications();
        this.lastOriginUpdate = null;
        this.lastRefreshed = null;
        this.success = false;
    }
}

