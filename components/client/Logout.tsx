'use client'

import toast from 'react-hot-toast';
import React from 'react'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect } from 'next/navigation';

const Logout = () => {

    const handleLogout = async () => {
        const response = await fetch('/api/logout');
        if (response.ok) {
            toast.success('User logged out!');
            window.location.reload();
            redirect('/');
        }
    };

    return (
        <button onClick={handleLogout} className='bg-red-500 px-3 py-2 rounded-xl text-white'>
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )
}

export default Logout