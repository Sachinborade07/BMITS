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



const e1 = new Manager("A", 1, 20000);
e1.getEmp();
console.log(e1.calculateBonus());

const e2 = new Engineer("B", 2, 15000);
e2.getEmp();
console.log(e2.calculateBonus());

const e3 = new Intern("C", 3, 10000);
e3.getEmp();
console.log(e3.calculateBonus());
