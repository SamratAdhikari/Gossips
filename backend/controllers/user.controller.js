import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });
        const allUsers = await User.find().select("-password");

        return res
            .status(200)
            .send({ message: "All users retrieved", allUsers });

        // error
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
};
