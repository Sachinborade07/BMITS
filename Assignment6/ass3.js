var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Payment = /** @class */ (function () {
    function Payment(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Payment;
}());
var creditCardPayment = /** @class */ (function (_super) {
    __extends(creditCardPayment, _super);
    function creditCardPayment(amount, date, cardNumber) {
        var _this = _super.call(this, amount, date) || this;
        _this.cardNumber = cardNumber;
        return _this;
    }
    creditCardPayment.prototype.processPayment = function () {
        console.log("Processing Payment of ".concat(this.amount, " on DATE ").concat(this.date, " having CARD number ").concat(this.cardNumber));
    };
    return creditCardPayment;
}(Payment));
var payPalPayment = /** @class */ (function (_super) {
    __extends(payPalPayment, _super);
    function payPalPayment(amount, date, accNo) {
        var _this = _super.call(this, amount, date) || this;
        _this.accNo = accNo;
        return _this;
    }
    payPalPayment.prototype.processPayment = function () {
        console.log("Processing Payment of ".concat(this.amount, " on DATE ").concat(this.date, " having CARD number ").concat(this.accNo));
    };
    return payPalPayment;
}(Payment));
var cryptoPayment = /** @class */ (function (_super) {
    __extends(cryptoPayment, _super);
    function cryptoPayment(amount, date, foreignAccNo) {
        var _this = _super.call(this, amount, date) || this;
        _this.foreignAccNo = foreignAccNo;
        return _this;
    }
    cryptoPayment.prototype.processPayment = function () {
        console.log("Processing Payment of ".concat(this.amount, " on DATE ").concat(this.date, " having CARD number ").concat(this.foreignAccNo));
    };
    return cryptoPayment;
}(Payment));
var cardPay = new creditCardPayment(12000, "12-02-2025", 123456);
cardPay.processPayment();
var payPay = new creditCardPayment(10000, "12-02-2025", 89348);
payPay.processPayment();
var crypPay = new creditCardPayment(232020, "12-02-2025", 2394830284);
crypPay.processPayment();
