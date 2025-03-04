import React from "react";
import { Controller, useFieldArray, useForm, SubmitHandler } from "react-hook-form";
// import { FormData } from "../types"; we didn't need it now
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import simulateApi from "../api/api";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


// creating a form schema for FORM validation 
const formSchema = z.object({
    firstName: z.string().min(1, "First Name Is Required"),
    lastName: z.string().min(1, "First Name Is Required"),
    email: z.string().email("Invalid Email Address"),
    age: z.number().min(18, "You Must Be At Least 18 Years Old"),
    gender: z.enum(['male', 'female', 'other'], {
        message: "Gender Is Required",
    }),
    birthDate: z.date(),
    hobbies: z.array(
        z.object({
            name: z.string().min(1, "Hobby Is Required"),
        })
    ).min(1, "At Least One Hobby Is Required")
})

//creating and using the schema
type FormData = z.infer<typeof formSchema>

const HookFormZ: React.FC = () => {
    const { register, formState: { errors, isSubmitting },
        control,
        handleSubmit,
        setError,
        reset } = useForm<FormData>
            ({
                defaultValues: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    age: 18,
                    // gender: "",
                    gender: undefined, // making it as undefined
                    birthDate: new Date,
                    hobbies: [{ name: "" }],
                },
                resolver: zodResolver(formSchema),
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
                <input {...register("firstName")} />
                {errors.firstName && (<p>{errors.firstName.message}</p>)}
            </div>
            <div>
                <label> LAST NAME </label>
                <input {...register("lastName")}
                />
                {errors.lastName && (<p>{errors.lastName.message}</p>)}
            </div>
            <div>
                <label> EMAIL </label>
                <input {...register("email")}
                />
                {errors.email && (<p>{errors.email.message}</p>)}
            </div>
            <div>
                <label> AGE </label>
                <input type="number"
                    {...register("age", { valueAsNumber: true })}
                />
                {errors.age && (<p>{errors.age.message}</p>)}
            </div>
            <div>
                <label> Gender </label>
                <select {...register("gender")} >
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
                            {...register(`hobbies.${index}.name`)}
                        />
                        {errors.hobbies?.[index]?.name && (
                            <p>{errors.hobbies[index].name.message}</p>
                        )}
                        {/* creating the field for hobby*/}
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

export default HookFormZ;
