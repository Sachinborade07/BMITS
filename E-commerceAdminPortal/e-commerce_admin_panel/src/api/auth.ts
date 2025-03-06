export const adminAuth = async (data: { username: string; password: string }) => {
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";

    if (data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD) {
        return { message: "Admin Login Successful" };
    } else {
        throw new Error("Invalid User Credentials");
    }
};

