import React from "react";
import { Controller, useFieldArray, useForm, SubmitHandler } from "react-hook-form";
import { FormData } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import simulateApi from "../api/api";

const HookForm: React.FC = () => {
    const { register, formState: { errors, isSubmitting }, control, handleSubmit, setError, reset } = useForm<FormData>({
        defaultValues: {
            firstName: " ",
            lastName: " ",
            email: " ",
            age: 21,
            gender: " ",
            birthDate: new Date,
            hobbies: [{ name: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "hobbies",
    });

    // since it is an asyncronus call as we are taking form data 
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const response = await simulateApi(data);
            console.log("Success", response);
            reset();
        } catch (error: any) {
            console.error("Error", error);
            setError("root", {
                message: error.message,
            });
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {/* here we are splitting the register and then performing the operation */}
                <label> FIRST NAME </label>
                <input {...register("firstName", {
                    required: "First Name Is Required",
                })} />
                {errors.firstName && (<p>{errors.firstName.message}</p>)}
            </div>
            <div>
                <label> LAST NAME </label>
                <input {...register("lastName", {
                    required: "Last Name Is Required",
                })}
                />
                {errors.lastName && (<p>{errors.lastName.message}</p>)}
            </div>
            <div>
                <label> EMAIL </label>
                <input {...register("email", {
                    required: "Email Is Required",
                    pattern: {
                        value: /^\S+@\S+$/i, message: "Invalid Email Address"
                    }
                })}
                />
                {errors.email && (<p>{errors.email.message}</p>)}
            </div>
            <div>
                <label> AGE </label>
                <input {...register("age", {
                    required: "Age Is Required",
                    min: { value: 18, message: "You Must be 18 years old" }
                })}
                />
                {errors.age && (<p>{errors.age.message}</p>)}
            </div>
            <div>
                <label> Gender </label>
                <select {...register("gender", { required: "Gender Is Required", })} >
                    <option value="">Select...</option>
                    <option value="male"> MALE</option>
                    <option value="female">FEMALE</option>
                    <option value="other">OTHER</option>
                </select>
                {errors.gender && (<p>{errors.gender.message}</p>)}
            </div>
            <div>
                {/* here we need to use the controlle to handle the DATETIME  */}
                <label> Birth Date </label>
                <Controller
                    control={control}
                    name="birthDate"
                    render={({ field }) => (
                        <DatePicker
                            placeholderText="Select date"
                            onChange={(date: Date | null) => field.onChange(date)}
                            selected={field.value}
                        />
                    )}
                />
            </div>
            <div>
                <label> Hobbies </label>
                {fields.map((hobby, index) => (
                    <div key={hobby.id}>
                        <input
                            {...register(`hobbies.${index}.name`, {
                                required: "Hobby Is Required",
                            })}
                        />
                        {errors.hobbies?.[index]?.name && (
                            <p>{errors.hobbies[index].name.message}</p>
                        )}
                        {/* creating the filed for */}
                        <button type="button" onClick={() => remove(index)}
                        > REMOVE HOBBY </button>
                    </div>
                ))}
                <button type="button" onClick={() => append({ name: "" })}>
                    ADD HOBBY
                </button>
            </div>
            <div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default HookForm;
