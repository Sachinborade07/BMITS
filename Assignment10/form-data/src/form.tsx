import React, { useState } from 'react';

const Form: React.FC = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        age: "",
        gender: "",
        skills: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEvent = (e: React.FormEvent) => {
        e.preventDefault();
        alert(JSON.stringify("Data is Submitted"));

        setFormData(Object.keys(formData).reduce((acc, key) => {
            acc[key as keyof typeof formData] = "";
            return acc;
        }, {} as typeof formData));
    };

    return (
        <form onSubmit={handleEvent}>
            <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
            <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />

            <label>
                <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
            </label>
            <label>
                <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
            </label>

            <select name="skills" value={formData.skills} onChange={handleChange}>
                <option value="">Select Skill</option>
                <option value="React">React</option>
                <option value="JS">JS</option>
                <option value="PYTHON">PYTHON</option>
            </select>

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="number" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

            <button type="submit">Submit</button>
        </form>
    )

};

export default Form;