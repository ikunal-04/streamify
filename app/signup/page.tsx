"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

const signup = () => {
    // this page redirecting the user to the signin page after making and checking
    // it if the user is already exists or not
    // const router = useRouter();
    return (
        <div>
            <h1>Signup Page</h1>
            <Button onClick={() => signIn()}>Sign In</Button>
            
        </div>
    )
}

export default signup
