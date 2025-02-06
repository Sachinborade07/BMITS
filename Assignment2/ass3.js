// Online Payment System
/*
## Online Payment System

Create Payment class with amount, date.
Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
Abstraction: Hide sensitive details like #cardNumber.
*/

// Payment SuperClass
class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }

    processPayment() {
        return `Payment of ${this.amount} on ${this.date}`;
    }
}

// CreditCardPayment SubClass
class CreditCardPayment extends Payment {
    // private to Customer
    #cardNumber;

    constructor(amount, date, cardNumber) {
        super(amount, date);
        this.#cardNumber = cardNumber;
    }

    processPayment() {
        console.log(`Payment of ${this.amount} on ${this.date}`);
        return `CrediCard Number is:- xxx${this.#cardNumber.slice(-4)}`;
    }
}

// PayPalPayment SubClass
class PayPalPayment extends Payment {
    // private to PayPalPayment
    #accno;
    constructor(amount, date, accno) {
        super(amount, date);
        this.#accno = accno;
    }

    processPayment() {
        console.log(`Payment of ${this.amount} on ${this.date}`);
        return `PayPalAccount Number is:- ${this.#accno}`;
    }
}

// cryptoPayment SubClass
class cryptoPayment extends Payment {
    #foreignAccNo;
    constructor(amount, date, foreignAccNo) {
        super(amount, date);
        this.#foreignAccNo = foreignAccNo;
    }

    processPayment() {
        console.log(`Payment of ${this.amount} on ${this.date}`);
        return `cryptoPayment Number is:- ${this.#foreignAccNo}`;
    }
}

// Creating the Objects
const c1 = new CreditCardPayment(10000, "2025-02-04", "232320989283");
const c2 = new PayPalPayment(20000, "2025-02-04", "paypl23lc33");
const c3 = new cryptoPayment(300000, "2025-02-04", "crypto38473847");

console.log(c1.processPayment());
console.log(c2.processPayment());
console.log(c3.processPayment());
