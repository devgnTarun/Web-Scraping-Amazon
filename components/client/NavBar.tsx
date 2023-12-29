import Link from "next/link"
import AuthNav from "../../app/AuthNav"


const NavBar = () => {
    return (
        <header className='w-full bg-gray-100'>
            <nav className='nav'>
                <Link href={'/'} className="flex items-center gap-1">
                    <p style={{ letterSpacing: '1px' }} className="mx-2 text-2xl font-semibold ">Smart<span className="text-primary ">Buy</span></p>
                </Link>

                <AuthNav />
            </nav>
        </header>
    )
}

export default NavBar