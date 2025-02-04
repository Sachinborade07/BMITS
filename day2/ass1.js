// Assignment
/*
## Employee Management System

Create Employee class with name, id, #salary.
Subclasses: Manager, Engineer, Intern.
Polymorphism: Override calculateBonus() for each role.

NOTE:- private fields do not get inherited in a way that allows direct access.
That's why we create a getSalary() method, so subclasses can access the salary
safely without breaking encapsulation.

*/


// Base Class 

class Employee {
    constructor(name, id, salary) {
        this.name = name;
        this.id = id;
        this.#salary = salary;
    }
    #salary;
    getSalary() {
        return this.#salary;
    }

    caculateBonus() {
        return this.#salary * 0.05;
    }
}

// Manager SubClass
class Manager extends Employee {
    calculateBonus() {
        return this.getSalary() * 0.10; // 10% bonus
    }
}

// Engineer SubClass
class Engineer extends Employee {
    calculateBonus() {
        return this.getSalary() * 0.08; // 7% bonus
    }
}

// Intern SubClass
class Intern extends Employee {
    calculateBonus() {
        return this.getSalary() * 0.06; // 2% bonus
    }
}

// Creating the object for it 

const emp1 = new Manager("Sachin", 1, 50000);
const emp2 = new Engineer("Ram", 2, 50000);
const emp3 = new Intern("Shyam", 3, 50000);

console.log(`Name:- ${emp1.name} Bonus:- ${emp1.calculateBonus()}`);
console.log(`Name:- ${emp2.name} Bonus:- ${emp2.calculateBonus()}`);
console.log(`Name:- ${emp3.name} Bonus:- ${emp3.calculateBonus()}`);