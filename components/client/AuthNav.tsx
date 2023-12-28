"use client"

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const AuthNav = () => {

    const navIcons = [
        { src: '/assets/icons/black-heart.svg', alt: 'heart', link: '/loved' },
        { src: '/assets/icons/user.svg', alt: 'user', link: '/login' },
    ]

    const handleLogout = () => {
        localStorage.removeItem('auth')
        toast.success('You are logged out!');
        window.location.reload();
        redirect('/')
    }

    return (
        <>
            <div className="flex items-center gap-5">
                <Link className="text-sm text-gray-800 hover:text-orange-500 mx-3 css_set" href={'/products'}>Products</Link>


                <Link href={'/loved'}>
                    <Image src={'/assets/icons/black-heart.svg'} alt={'loved'} width={28} height={28} className="object-contain" />
                </Link>
                {
                    localStorage && localStorage.getItem('auth') ? <button onClick={handleLogout} className='bg-red-500 px-3 py-2 rounded-xl text-white'><FontAwesomeIcon icon={faRightFromBracket} /></button> :
                        <Link href={'/login'}>
                            <Image src={'/assets/icons/user.svg'} alt={'user'} width={28} height={28} className="object-contain" />
                        </Link>
                }

            </div>
        </>
    )
}

export default AuthNav