import User from "@/lib/models/user.model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request: any) {
    const { email, password } = await request.json();
    try {
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).select('+password');

        if (!user) return NextResponse.json({ message: `User not found email!` }, { status: 404 });

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) return NextResponse.json({ message: `Invalid Credentials!` }, { status: 403 });

        // Generate a JWT token directly
        const token = await jwt.sign({ id: user._id }, 'somethingfishy', {
            expiresIn: process.env.JWT_EXPIRE,
        });

        const cookieStore = await cookies();
        cookieStore.set('auth', token);

        return NextResponse.json({ token }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}