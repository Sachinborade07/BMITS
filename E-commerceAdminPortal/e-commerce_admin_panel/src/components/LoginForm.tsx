import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { adminAuth } from "../api/auth";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";


const formAdmin = z.object({
    email: z.string().min(4, "Email Is Required"),
    password: z.string().min(4, "Password Is Required")
});

type formData = z.infer<typeof formAdmin>;

const LoginFormZ: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigation

    const { register, formState: { errors }, handleSubmit, setError, reset } = useForm<formData>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(formAdmin),
    });

    const onSubmit: SubmitHandler<formData> = async (data) => {
        try {
            let response;
            if (data.email === "admin") {  // Ensure "admin" is lowercase if needed
                response = await adminAuth({ username: data.email, password: data.password });
                console.log("Admin Login SUCCESS", response);
                navigate("/admin-dashboard"); // Redirect to admin dashboard
            }
            reset();
        } catch (error: any) {
            console.log("Error:", error.message);
            setError("root", { message: error.message });

            if (data.email === "admin") {
                navigate("/admin-login");
            }
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-card">
                    <h2>ADMIN LOGIN</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label> EMAIL </label>
                            <input {...register("email")} />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label> PASSWORD </label>
                            <input type="password" {...register("password")} />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginFormZ;
