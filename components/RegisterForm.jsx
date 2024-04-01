'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('All fields are necessary');
            return;
        }

        try {
            const userRes = await fetch('api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            });

            const { user } = await userRes.json();

            if (user) {
                setError('User already exists');
                return;
            }

            const res = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push('/');
            } else {
                console.log('user registration failed');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='grid place-items-center h-screen'>
            <div className='shadow-lg p-5 rounded-lg border-t-4 '>
                <h1 className='text-xl font-bold my-4'>Register</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <input
                        type='text'
                        placeholder='FullName'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded'>
                        Register
                    </button>
                </form>

                {error && (
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )}

                <Link className='text-sm mt-3 text-right' href={'/'}>
                    Already have an account?{' '}
                    <span className='underline'>Login</span>
                </Link>
            </div>
        </div>
    );
};
