import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res)=>{
 
    // get user details from frontend
    const {username, email, fullName, password} = req.body;
    
    // validation - not empty
    if([username, email, fullName, password]
        .some((field)=> field.trim()===""))
        {
            throw new ApiError(400, "All fields are required")
        }
    
    // check if user already exists: username, email

    const existedUser = await User.findOne({
        $or:[{username}, {email}]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    
    // check for images, check for avatar
    // console.log(req.files);  
    
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverLocalPath = req.files?.coverImage?.[0]?.path

    // console.log(coverLocalPath);
    
    if(!avatarLocalPath)
    {
        throw new ApiError(400,"Avatar File is required")
    }

    // upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverLocalPath)
    
    // console.log(coverImage);
    
    if(!avatar)
    {
        throw new ApiError(400,"Avatar File is required")
    }
    
    // create user object - create entry in db
    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password, 
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
    })

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
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