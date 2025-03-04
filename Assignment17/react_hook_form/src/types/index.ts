export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    gender: string;
    birthDate: Date;
    hobbies: Hobby[];
}

export interface Hobby {
    name: string;
}
