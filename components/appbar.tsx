"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AppBar = () => {
    return (
        <div className="flex justify-between shadow-sm shadow-white p-4 items-center">
            <div className="text-white">
                <h1>logo</h1>
            </div>
            <div className="flex gap-3">
                <Link href={'/signup'}>
                    <Button>SignUp</Button>
                </Link>
                <Button onClick={() => signIn()}>SignIn</Button>
            </div>
        </div>
    )
}