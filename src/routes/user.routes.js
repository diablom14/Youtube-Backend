import { Router } from "express";
import { changePassword, getCurrentUser, getUserChannelProfile, getUserWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateAvatar, updateCoverImage } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register",
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]), 
    registerUser
)

router.post("/login", loginUser)

// secured routes
router.post("/logout",verifyJwt,logoutUser)
router.post("/refresh-token", refreshAccessToken)
router.post("/change-password", verifyJwt, changePassword)
router.get("/get-user", verifyJwt, getCurrentUser)
router.patch("/update-account", verifyJwt, updateAccountDetails)
router.patch("/update-avatar", verifyJwt, upload.single("avatar"), updateAvatar)
router.patch("/update-coverImage", verifyJwt, upload.single("coverImage"), updateCoverImage)
router.get("/channel/:username", verifyJwt, getUserChannelProfile)
router.get("/history", verifyJwt, getUserWatchHistory)

export default router