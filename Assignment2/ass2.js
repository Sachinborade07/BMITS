// Vehicle Rental System

/* 

## Vehicle Rental System

Create Vehicle class with brand, model, rentPricePerDay.
Subclasses: Car, Bike, Truck.
Polymorphism: Implement calculateRentalCost(days).

*/

class Vehicle {
    constructor(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}

// Car SubClass
class Car extends Vehicle {
    calculateRentalCost(days) {
        return super.calculateRentalCost(days) * 1.05; // 5% extra charge
    }
}

// Bike SubClass
class Bike extends Vehicle {
    calculateRentalCost(days) {
        return super.calculateRentalCost(days) * 1.01; // 1% charge
    }
}

// Truck SubClass
class Truck extends Vehicle {
    calculateRentalCost(days) {
        return super.calculateRentalCost(days) * 1.10; // 15% extra charge
    }
}

// Creating Objects
const car = new Car("MARUTI", "ALTO", 50);
const bike = new Bike("BMW", "ZX-10R", 30);
const truck = new Truck("TATA", "PickUP", 100);

console.log(`Car Rental Cost for 3 days: $${car.calculateRentalCost(3)}`);
console.log(`Bike Rental Cost for 3 days: $${bike.calculateRentalCost(3)}`);
console.log(`Truck Rental Cost for 3 days: $${truck.calculateRentalCost(3)}`);
