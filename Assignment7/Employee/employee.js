var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Department = /** @class */ (function () {
    function Department() {
        this.employees = [];
    }
    Department.prototype.addEmployee = function (employees) {
        this.employees.push(employees);
    };
    Department.prototype.removeEmployee = function (id) {
        this.employees = this.employees.filter(function (emp) { return emp.id !== id; });
    };
    Department.prototype.getTotalSalary = function () {
        return this.employees.reduce(function (total, emp) { return total + emp.salary; }, 0);
    };
    Department.prototype.listEmployees = function () {
        console.log(this.employees);
    };
    return Department;
}());
var GenericStorage = /** @class */ (function () {
    function GenericStorage() {
        this.items = [];
    }
    GenericStorage.prototype.add = function (item) {
        this.items.push(item);
    };
    GenericStorage.prototype.remove = function (item) {
        this.items = this.items.filter(function (i) { return i !== item; });
    };
    GenericStorage.prototype.getAll = function () {
        return this.items;
    };
    return GenericStorage;
}());
function updateSalary(employee, newSalary) {
    return __assign(__assign({}, employee), { salary: newSalary });
}
var emp1 = { id: 1, name: "A", position: "FullStackDeveloper", salary: 50000 };
var emp2 = { id: 2, name: "B", position: "UI/UX", salary: 50000 };
var dept = new Department();
dept.addEmployee(emp1);
dept.addEmployee(emp2);
dept.listEmployees();
console.log("Salary is :", dept.getTotalSalary());
var updatesal = updateSalary(emp2, 57000);
console.log(updatesal);
