import Image from "next/image"
import Link from "next/link"

const navIcons = [
    { src: '/assets/icons/black-heart.svg', alt: 'heart', link: '/loved' },
    { src: '/assets/icons/user.svg', alt: 'user', link: '/login' },
]


const NavBar = () => {
    return (
        <header className='w-full'>
            <nav className='nav'>
                <Link href={'/'} className="flex items-center gap-1">
                    <p style={{ letterSpacing: '1px' }} className="mx-2 text-2xl font-semibold ">Buying<span className="text-primary">Sense</span></p>
                </Link>

                <div className="flex items-center gap-5">
                    <Link className="text-sm text-gray-800 hover:text-orange-500 mx-3" href={'/products'}>Products</Link>
                    {navIcons.map((e) =>
                        <Link href={e.link}>
                            <Image src={e.src} alt={e.alt} key={e.alt} width={28} height={28} className="object-contain" />
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default NavBar