abstract class Payment {
    protected amount: number;
    protected date: string;

    constructor(amount: number, date: string) {
        this.amount = amount;
        this.date = date;
    }
    abstract processPayment(): void;
}

class creditCardPayment extends Payment {

    private cardNumber: number;

    constructor(amount: number, date: string, cardNumber: number) {
        super(amount, date);
        this.cardNumber = cardNumber;
    }
    processPayment(): void {
        console.log(`Processing Payment of ${this.amount} on DATE ${this.date} having CARD number ${this.cardNumber}`);
    }
}

class payPalPayment extends Payment {
    private accNo: number;

    constructor(amount: number, date: string, accNo: number) {
        super(amount, date);
        this.accNo = accNo;
    }

    processPayment(): void {
        console.log(`Processing Payment of ${this.amount} on DATE ${this.date} having CARD number ${this.accNo}`);
    }
}

class cryptoPayment extends Payment {

    private foreignAccNo: number;

    constructor(amount: number, date: string, foreignAccNo: number) {
        super(amount, date);
        this.foreignAccNo = foreignAccNo;
    }

    processPayment(): void {
        console.log(`Processing Payment of ${this.amount} on DATE ${this.date} having CARD number ${this.foreignAccNo}`);
    }
}

const cardPay = new creditCardPayment(12000, "12-02-2025", 123456);
cardPay.processPayment();

const payPay = new creditCardPayment(10000, "12-02-2025", 89348);
payPay.processPayment();

const crypPay = new creditCardPayment(232020, "12-02-2025", 2394830284);
crypPay.processPayment();