import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const { name, email, password } = await request.json();
    try {
        const isUser = await User.findOne({email});

        if (isUser) return NextResponse.json({ message: 'User already exists on this email!' }, { status: 403 });

        const user = await User.create({ name, email, password });

        return NextResponse.json({ user }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}