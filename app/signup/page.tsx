"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100)
});

const signup = () => {
    // this page redirecting the user to the signin page after making and checking
    // it if the user is already exists or not
    // const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
    })

    return (
        <div>
            <div className='flex'>
                <h1>Already have an account?</h1>
                <Button onClick={() => signIn()}>Sign In</Button>             
            </div>
            <div>

            </div>
        </div>
    )
}

export default signup

// await prisma.user.create({
//     data: {
//         id: user.id,
//         email: user.email,
//         password: user.password
//     }
// });
// console.log(user); 