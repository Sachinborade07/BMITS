import { FormData } from "../types";

// Simulate API call
const simulateApi = (
    data: FormData
): Promise<{ success: boolean; data: FormData; message?: string }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0) {
                reject({ message: "Server Error Occured. Please try again" });
            }
            else {
                resolve({ success: true, data });
            }
        }, 2000);
    });
}


export default simulateApi;