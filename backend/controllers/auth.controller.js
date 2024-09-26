import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import genTokenAndSetCookie from "../utils/gen.token.js";

export const signup = async (req, res) => {
    try {
        // extract data from req.body
        const { fullName, username, password, confirmPassword, gender } =
            req.body;

        // check password
        if (password != confirmPassword) {
            return res.status(400).send({ message: "Passwords don't match" });
        }

        // check if username name is already taken
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).send({ message: "Username already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPswd = await bcrypt.hash(password, salt);

        // profile pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPswd,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (!newUser) {
            return res.status(400).send({ message: "Invalid user data" });
        }

        // JWT token
        genTokenAndSetCookie(newUser._id, res);

        await newUser.save();

        // Send the response with _id included
        return res.status(200).send({
            message: "Signup successful",
            userDetails: { _id: newUser._id, ...newUser._doc }, // Use _doc to spread the actual document
        });

        // error
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const isUser = await User.findOne({ username });

        // Compare the provided password with the stored one (if user exists)
        const isPassword = await bcrypt.compare(
            password,
            isUser?.password || ""
        );

        // If user or password is invalid, send error and stop execution
        if (!isUser || !isPassword) {
            return res
                .status(404)
                .send({ message: "Invalid username or password!" });
        }

        // If user and password are valid, generate token and set cookie
        genTokenAndSetCookie(isUser._id, res);

        // Send success response
        return res.status(200).send({ message: "Login successful!", isUser });
    } catch (error) {
        // Catch any unexpected errors
        return res.status(400).send({ message: error.message });
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
