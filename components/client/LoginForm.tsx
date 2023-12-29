'use client'

import { loginUser } from '@/lib/auth';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);



    const handleClick = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await loginUser(email, password);

            if (response.success) {
                setLoading(false);
                toast.success('User logged in successfully!'); // Notify success
                window.location.reload();
                redirect('/'); // Redirect as needed
            } else {
                toast.error(response.message || 'Error occured while log in!'); // Show error message
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.message);
            console.log(error)
        }
    }



    return (
        <form onSubmit={handleClick} className="xs:w-[300px] w-[400px] flex-col py-8 px-4 ">
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email!' className='searchbar-input my-2 mt-8' />
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter you password!' name="Password" className='searchbar-input my-2' />
            <button disabled={email.length < 5 || password.length < 8 || loading} type='submit' className="searchbar-btn w-full my-5">{loading ? 'Working on it!' : "Login"}</button>
            <Link href="/register" className='text-gray-500 py-4 text-xs'>⭐ Don't have Account? Register</Link>
        </form>
    )
}

export default LoginForm