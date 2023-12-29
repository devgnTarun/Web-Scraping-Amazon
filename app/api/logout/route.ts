import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET() {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth');
        if (!token) return NextResponse.json({ message: 'Token not available' }, { status: 404 });
        await cookiesStore.delete('auth')

        return NextResponse.json({ status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}