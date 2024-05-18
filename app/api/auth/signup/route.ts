import express from 'express';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

export async function POST(req: NextRequest, res: NextResponse) {
    let data;
    try {
        data = await req.json();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON format' });
    }

    if (!data.email || !data.password) {
        return NextResponse.json({ error: 'Email and password are required' });
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if(userExists){
        return NextResponse.json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10) as string;

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword
        }
    });
    return NextResponse.json(user);
}
