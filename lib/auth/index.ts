'use server'

import User from "@/lib/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'


interface LoginResponse {
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
