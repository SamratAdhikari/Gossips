import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import genTokenAndSetCookie from "../utils/gen.token.js";

export const signup = async (req, res) => {
    try {
        // Extract data from req.body
        const { fullName, username, password, confirmPassword, gender } =
            req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ success: false, message: "Passwords don't match" });
        }

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPswd = await bcrypt.hash(password, salt);

        // Generate profile picture URLs
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user
        const newUser = new User({
            fullName,
            username,
            password: hashedPswd,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (!newUser) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid user data" });
        }

        // Generate token and set it in cookies
        genTokenAndSetCookie(newUser._id, res);

        // Save the new user in the database
        await newUser.save();

        // Return success response with user details
        return res.status(200).json({
            success: true,
            message: "Signup successful",
            userDetails: { _id: newUser._id, ...newUser._doc }, // Use _doc to get document fields
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        // Compare the provided password with the stored one (if user exists)
        const isPassword = await bcrypt.compare(password, user?.password || "");

        // If user or password is invalid, send error response
        if (!user || !isPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password!",
            });
        }

        // If valid, generate token and set cookie
        genTokenAndSetCookie(user._id, res);

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            user,
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).send({ message: "Logout successfully" });

        // error
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};
