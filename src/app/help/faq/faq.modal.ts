export class FaqArr {
    answer: string;
    qno: string;
    question: string;

    constructor() {
        this.answer = null;
        this.qno = null;
        this.question = null;
    }
}

export class FaqObj {
    faq: Array<FaqArr>;

    constructor() {
        this.faq = [];
    }
}