import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({
        fullName,
        username,
        password,
        confirmPassword,
        gender,
    }) => {
        const success = handleInputErrors({
            fullName,
            username,
            password,
            confirmPassword,
            gender,
        });
        if (!success) return;

        setLoading(true); // Start loading

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    username,
                    password,
                    confirmPassword,
                    gender,
                }),
            });

            const data = await res.json();

            // Check if the response contains a success flag
            if (!data.success) {
                throw new Error(data.message);
            }

            // Store user details in local storage
            localStorage.setItem("user-info", JSON.stringify(data.userDetails));

            // Set authenticated user in context
            setAuthUser(data.userDetails);

            // Success message
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message); // Display the error from backend
        } finally {
            setLoading(false); // End loading
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
}) {
    if (!(fullName && username && password && confirmPassword && gender)) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Passwords must be at least 6 characters long");
        return false;
    }

    return true;
}
