
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers'
import Logout from '@/components/client/Logout';

const AuthNav = async () => {

    const cookieStore = await cookies();
    const isLogged = await cookieStore.get('auth');

    return (
        <div className="flex items-center gap-5">
            <Link className="text-sm text-gray-800 hover:text-orange-500 mx-3 css_set" href={'/products'}>
                Products
            </Link>

            <Link href={'/loved'}>
                <Image src={'/assets/icons/black-heart.svg'} alt={'loved'} width={28} height={28} className="object-contain" />
            </Link>

            {isLogged ? (
                <Logout />
            ) : (
                <Link href={'/login'}>
                    <Image src={'/assets/icons/user.svg'} alt={'user'} width={28} height={28} className="object-contain" />
                </Link>
            )}
        </div>
    );
};

export default AuthNav;
