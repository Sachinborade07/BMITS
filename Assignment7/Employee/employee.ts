interface Employee {
    id: number;
    name: string;
    position: string;
    salary: number;
}

interface Manager extends Employee {
    teamsize: number;
}

class Department {
    private employees: Employee[] = [];

    addEmployee(employees: Employee): void {
        this.employees.push(employees);
    }

    removeEmployee(id: number): void {
        this.employees = this.employees.filter(emp => emp.id !== id);
    }

    getTotalSalary(): number {
        return this.employees.reduce((total, emp) => total + emp.salary, 0);
    }

    listEmployees(): void {
        console.log(this.employees);
    }
}

class GenericStorage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(item: T): void {
        this.items = this.items.filter(i => i !== item);
    }

    getAll(): T[] {
        return this.items;
    }
}

function updateSalary<T extends Employee>(employee: T, newSalary: number): T {
    return { ...employee, salary: newSalary };
}

const emp1: Employee = { id: 1, name: "A", position: "FullStackDeveloper", salary: 50000 }
const emp2: Employee = { id: 2, name: "B", position: "UI/UX", salary: 50000 };

const dept = new Department();
dept.addEmployee(emp1);
dept.addEmployee(emp2);
dept.listEmployees();

console.log("Total Salary is :", dept.getTotalSalary());

const updatesal = updateSalary(emp2, 57000);
console.log(updatesal);