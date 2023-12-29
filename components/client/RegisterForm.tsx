'use client'

import { registerUser } from '@/lib/auth';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)


    // Assuming you have a function to handle form submission similar to handleClick for registration
    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await registerUser(name, email, password);

            if (response?.success) {
                setLoading(false);
                toast.success('User Registered Successfully! Login ');
                setEmail('');
                setName('');
                setPassword('');
            } else {
                toast.error(response?.message || 'Error occured while regstering')
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            toast.error(error?.message)
        }
    }


    return (
        <form onSubmit={handleRegister} className="xs:w-[300px] w-[400px] flex-col py-8 px-4 ">
            <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name!' className='searchbar-input my-2 mt-8' />
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email!' className='searchbar-input my-2 ' />
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter you password!' name="Password" className='searchbar-input my-2' />
            <button disabled={password.length < 8 || loading} type='submit' className="searchbar-btn w-full my-5">{loading ? 'Working on it!' : "Register"}</button>
            <Link href="/login" className='text-gray-500 py-4 text-xs'>⭐ Having Account? Login</Link>
        </form>
    )
}

export default RegisterForm