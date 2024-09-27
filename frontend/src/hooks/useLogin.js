import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputErrors({ username, password });
        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            // Check if the response is successful
            if (!data.success) {
                throw new Error(data.message); // Display the backend message
            }

            // Store only the user data in localStorage, not the entire response
            localStorage.setItem("user-info", JSON.stringify(data.user));
            setAuthUser(data.user);

            // Notify user about successful login
            toast.success(data.message);
        } catch (error) {
            // Display the error message
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!(username && password)) {
        toast.error("Please fill all the fields");
        return false;
    }
    return true;
}
