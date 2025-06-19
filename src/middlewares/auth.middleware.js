import { JsonWebTokenError as jwt } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { User } from "../models/user.model";


export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        // get the access token from user cookie
        const token = req.cookies?.accessToken ||
            req.header("Authorization").replace("Bearer ", "")

        if (!token) {
            throw new ApiError(400, "Unauthorized")
        }

        const decodedToken = jwt.verify(token,
            process.env.ACCESS_TOKEN_SECRET)

        const user = User.findById(decodedToken._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(400, "Invalid Access Token")
        }

        req.user = user

        next()
    } catch (err) {
        console.log(err);
        throw err
    }

}) 