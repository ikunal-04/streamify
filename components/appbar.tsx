"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AppBar = () => {
    return (
        <div>
            <Link href={'/signup'}>
                <Button>SignUp</Button>
            </Link>
            <Button onClick={() => signIn()}>SignIn</Button>
        </div>
    )
}