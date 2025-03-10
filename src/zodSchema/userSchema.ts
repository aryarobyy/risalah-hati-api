import { z } from "zod";

export const registUserSchema = z.object({
    email: z.string({
        message: "Email is required."
    }).email({ message: "Please enter a valid email address." }).max(255, { message: "Email must not exceed 255 characters." }),

    username: z.string({
        message: "Username is required."
    }).min(4, {
        message: "Username must be at least 4 characters long."
    }).max(255, { message: "Username must not exceed 255 characters." }),

    // name: z.string({
    //     message: "Name is required."
    // }).min(3, { message: "Name must be at least 3 characters long." }).max(255, { message: "Name must not exceed 255 characters." }),

    password: z.string({
        message: "Password is required."
    }).min(4, { message: "Password must be at least 4 characters long." }).max(255, { message: "Password must not exceed 255 characters." }),

    role: z.enum(["USER", "ADMIN"], { message: "Role is required" })
});

export const updateUserSchema = z.object({
    email: z.string({
        message: "Email is required."
    }).email({ message: "Please enter a valid email address." }).max(255, { message: "Email must not exceed 255 characters." }),

    username: z.string({
        message: "Username is required."
    }).min(4, {
        message: "Username must be at least 4 characters long."
    }).max(255, { message: "Username must not exceed 255 characters." }),

    // profilePic: z.string({
    //     message: "Profile pic is required"
    // }),

    // name: z.string({
    //     message: "Name is required."
    // }).min(3, { message: "Name must be at least 3 characters long." }).max(255, { message: "Name must not exceed 255 characters." }),

    role: z.enum(["USER", "ADMIN"], { message: "Role is required" })
});

export const loginUserSchema = z.object({
    email: z.string({
        message: "Email is required."
    }).email({ message: "Please enter a valid email address." }).max(255, { message: "Email must not exceed 255 characters." }),
    
    password: z.string({
        message: "Password is required."
    }).min(4, { message: "Password must be at least 4 characters long." }).max(255, { message: "Password must not exceed 255 characters." }),
});

export const deleteUserSchema = z.object({
    profilePic: z.string({
        message: "Profile Picture is required!"
    })
});

export const verifyUserTokenSchema = z.object({
    token: z.string({
        message: "Token is required!"
    })
})