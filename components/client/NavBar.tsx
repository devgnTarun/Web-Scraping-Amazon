import Image from "next/image"
import Link from "next/link"

const navIcons = [
    { src: '/assets/icons/search.svg', alt: 'search', link: '/search' },
    { src: '/assets/icons/black-heart.svg', alt: 'heart', link: '/loved' },
    { src: '/assets/icons/user.svg', alt: 'user', link: '/login' },
]


const NavBar = () => {
    return (
        <header className='w-full'>
            <nav className='nav'>
                <Link href={'/'} className="flex items-center gap-1">
                    <Image src={'/assets/icons/logo.svg'} width={27} height={27} alt="logo" />
                    <p className="nav-logo">Buying<span className="text-primary">Sense</span></p>
                </Link>

                <div className="flex items-center gap-5">
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