import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).send("You are not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) =>{
        if (err) {
            console.log(err);
            return res.status(401).send("Invalid token");
        }
        
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).send("User not found");
            }
            return res.status(200).send("User deleted successfully"); // Sending response after deletion
        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    });
};
