"use client";
import React from 'react';
import { useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const socket = io('http://localhost:4000', {
  transports: ['websocket', 'polling'],
});

const Dashboard = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [streamKey, setStreamKey] = useState<string>('');

  const startStream = async () => {
    if (!streamKey) {
      alert("Please enter your stream key!");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    setStream(stream);

    socket.emit("key", streamKey);
    try {
      const mediaRecorder = new MediaRecorder(stream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
      });
      mediaRecorder.ondataavailable = async (event) => {
        const arrayBuffer = await event.data.arrayBuffer();
        socket.emit("binaryStream", arrayBuffer);
      };
      mediaRecorder.start(25);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className='bg-black text-white h-screen p-6'>
      <div className='flex flex-col gap-4'>
      <Label>Enter your stream key</Label>
      <Input type="password" placeholder='Enter your stream key...' value={streamKey} 
        onChange={(e) => setStreamKey(e.target.value)} />
        <div>
        <Button onClick={startStream}>Start Stream</Button>
        </div>
      </div>
      
      <div className='rounded-xl mt-4 flex justify-center'>
      <video className='rounded-xl' ref={videoRef} autoPlay muted></video>
      </div>



    </div>
  );
};

export default Dashboard;
