class Employee {
    name: string;
    id: number;
    protected salary: number;

    constructor(name: string, id: number, salary: number) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }

    calculateBonus() {
        return 0;
    }

    getEmp(): void {
        console.log(`Employee: ${this.name}, ID: ${this.id}, Salary: ${this.salary}`);
    }
}


class Manager extends Employee {
    calculateBonus(): number {
        return this.salary * 0.25;
    }
}

class Engineer extends Employee {
    calculateBonus(): number {
        return this.salary * 0.20;
    }
}

class Intern extends Employee {
    calculateBonus(): number {
        return this.salary * 0.1;
    }
}

const emp1 = new Manager("A", 1, 20000);
emp1.getEmp();
console.log(emp1.calculateBonus());

const emp2 = new Engineer("B", 2, 15000);
emp2.getEmp();
console.log(emp2.calculateBonus());

const emp3 = new Intern("C", 3, 10000);
emp3.getEmp();
console.log(emp3.calculateBonus());
