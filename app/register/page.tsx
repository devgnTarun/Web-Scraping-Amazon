import RegisterForm from '@/components/client/RegisterForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

const page = async () => {

    const cookieStore = await cookies();
    const token = await cookieStore.get('auth');

    if (token) {
        redirect('/')
    };

    return (
        <div className="w-full min-h-[90vh] flex items-center justify-center">
            <RegisterForm />
        </div>
    )
}

export default page