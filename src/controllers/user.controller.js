import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse"

const registerUser = asyncHandler(async (req, res)=>{
 
    // get user details from frontend
    const {username, email, fullName, password} = req.body;
    
    // validation - not empty
    if([username, email, fullName, password]
        .some((field)=> field.trim()===""))
        {
            return new ApiError(400, "All fields are required")
        }
    
    // check if user already exists: username, email

    const existedUser = User.findOne({
        $or:[{username}, {email}]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    
    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath)
    {
        throw new ApiError(400,"Avatar File is required")
    }

    // upload them to cloudinary, avatar
    const avatar = uploadOnCloudinary(avatarLocalPath)
    const coverImage = uploadOnCloudinary(coverLocalPath)

    if(!avatar)
    {
        throw new ApiError(400,"Avatar File is required")
    }
    
    // create user object - create entry in db
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password, 
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
    })

    // remove password and refresh token field from response
    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check for user creation
    if(!createdUser) return new ApiError(500, "User couldn't be registered")
          
    // return res
    return res.status(201).json(new 
        ApiResponse(200, "User is successfully created")
    )
})  

export {registerUser}