'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const options = {
        method: 'post', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            name, email, password
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
            const response = await fetch('/api/register', options);
            if (response.ok) {
                setLoading(false);
                toast.success('User Registered Successfully! Login ');
                setEmail('');
                setName('');
                setPassword('');
                return redirect('/login')
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
        <form onSubmit={handleClick} className="xs:w-[300px] w-[400px] flex-col py-8 px-4 ">
            <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name!' className='searchbar-input my-2 mt-8' />
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email!' className='searchbar-input my-2 ' />
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter you password!' name="Password" className='searchbar-input my-2' />
            <button disabled={password.length < 8 || loading} type='submit' className="searchbar-btn w-full my-5">{loading ? 'Working on it!' : "Register"}</button>
            <Link href="/login" className='text-gray-500 py-4 text-xs'>⭐ Having Account? Login</Link>
        </form>
    )
}

export default RegisterForm