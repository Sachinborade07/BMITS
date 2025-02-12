class Vehicle {
    brand: string;
    model: string;
    rentPricePerDay: number;

    constructor(brand: string, model: string, rentPricePerDay: number) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    calculateRent(days: number): number {
        return this.rentPricePerDay * days;
    }
}


class Car extends Vehicle {
    calculateRent(days: number): number {
        return super.calculateRent(days) * 1.1;
    }
}

class Bike extends Vehicle {
    calculateRent(days: number): number {
        return super.calculateRent(days);
    }
}

class Truck extends Vehicle {
    calculateRent(days: number): number {
        return super.calculateRent(days) * 1.2;
    }
}

const car1 = new Car("MARUTI", "ALTO", 50);
console.log(car1.calculateRent(10));
const truck1 = new Truck("TATA", "PickUP", 100);
console.log(truck1.calculateRent(10));
const bike1 = new Bike("BMW", "ZX-10R", 30);
console.log(bike1.calculateRent(10));