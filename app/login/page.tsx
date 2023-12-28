'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const options = {
        method: 'post', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            email, password
        })
    }
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('auth')) {
            redirect('/');
        }
    }, []);

    const handleClick = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('/api/login', options);
            if (response.ok) {
                let data = await response.json();
                localStorage.setItem('auth', data?.token)
                window.location.reload();
                setLoading(false);
                toast.success('User Registered Successfully! Login ');
                redirect('/')
                // return redirect('/login')
            } else {
                const errorData = await response.json();
                setLoading(false);
                return toast.error(errorData.message);
            }
        } catch (error) {
            return setLoading(false);
        }
    }


    return (
        <div className="w-full min-h-[90vh] flex items-center justify-center">
            <form onSubmit={handleClick} className="xs:w-[300px] w-[400px] flex-col py-8 px-4 ">
                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email!' className='searchbar-input my-2 mt-8' />
                <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter you password!' name="Password" className='searchbar-input my-2' />
                <button disabled={email.length < 5 || password.length < 8 || loading} type='submit' className="searchbar-btn w-full my-5">{loading ? 'Working on it!' : "Login"}</button>
                <Link href="/register" className='text-gray-500 py-4 text-xs'>⭐ Don't have Account? Register</Link>
            </form>
        </div>
    )
}

export default page