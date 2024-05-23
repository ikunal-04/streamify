"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100)
});

const signup = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            console.log('data:', data);
            
            const response = await axios.post('http://localhost:3000/api/auth/signup', {
                email: data.email,
                password: data.password
            });

            if (response.data.error) {
                alert(response.data.error); // handle error appropriately
                console.error('An error occurred during signup:', response.data);
            } else {
                router.push('/api/auth/signin'); // redirect to sign-in page on successful signup
            }
        } catch (error) {
            console.error('An error occurred during signup:', error);
            alert('An error occurred during signup. Please try again.');
        }
    };

    return (
        <div className='bg-black h-screen text-white p-2 flex justify-center items-center'>
            <div className='bg-white text-black rounded-xl flex flex-col p-6 gap-3 h-max'>
                <h1>Sign up </h1>
                <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(handleSubmit)}>
                    <Label>Email</Label>
                    <Input placeholder='Enter your email' type="email" {...form.register("email")}/>
                    <Label>Password</Label>
                    <Input placeholder='Enter your password' type='password' {...form.register("password")}/>
                    <Button type="submit">Sign Up</Button>
                </form>
                <div className='flex'>
                    <h1>Already have an account? <span className='cursor-pointer underline text-blue-400' onClick={() => signIn()}>Sign in</span></h1> 
                </div>          
            </div>
            <div>

            </div>
        </div>
    );
}

export default signup;
