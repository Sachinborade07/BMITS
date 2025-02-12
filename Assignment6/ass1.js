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
var Employee = /** @class */ (function () {
    function Employee(name, id, salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    Employee.prototype.calculateBonus = function () {
        return 0;
    };
    Employee.prototype.getEmp = function () {
        console.log("Employee: ".concat(this.name, ", ID: ").concat(this.id, ", Salary: ").concat(this.salary));
    };
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Manager.prototype.calculateBonus = function () {
        return this.salary * 0.25;
    };
    return Manager;
}(Employee));
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Engineer.prototype.calculateBonus = function () {
        return this.salary * 0.20;
    };
    return Engineer;
}(Employee));
var Intern = /** @class */ (function (_super) {
    __extends(Intern, _super);
    function Intern() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Intern.prototype.calculateBonus = function () {
        return this.salary * 0.1;
    };
    return Intern;
}(Employee));
var e1 = new Manager("A", 1, 20000);
e1.getEmp();
console.log(e1.calculateBonus());
var e2 = new Engineer("B", 2, 15000);
e2.getEmp();
console.log(e2.calculateBonus());
var e3 = new Intern("C", 3, 10000);
e3.getEmp();
console.log(e3.calculateBonus());
