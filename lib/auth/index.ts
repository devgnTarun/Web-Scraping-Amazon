'use server'

import User from "@/lib/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'


interface LoginResponse {
    success: boolean;
    message?: string;
}

interface RegisterResponse {
    success: boolean;
    message?: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).select('+password');
        if (!user) {
            return { success: false, message: `User not found email!` };
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return { success: false, message: 'Invalid credentials' };
        }

        const token = await jwt.sign({ id: user._id }, 'somethingfishy', {
            expiresIn: process.env.JWT_EXPIRE,
        });

        const cookieStore = await cookies();
        cookieStore.set('auth', token);

        return { success: true };
    } catch (error: any) {
        console.log(`Error while login ${error.message}`);
        return { success: false, message: 'An error occurred during login' };
    }
}


export const registerUser = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
        const isUser = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

        if (isUser) {
            return { success: false, message: 'User already exists on this email!' };
        }

        const user = await User.create({ name, email, password });

        return { success: true, message: 'User registered!' };
    } catch (error: any) {
        console.log(`Error while registering user: ${error.message}`);
        return { success: false, message: 'An error occurred during registration' };
    }
};