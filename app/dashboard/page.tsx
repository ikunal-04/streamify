"use client";
import React from 'react';
import { useState, useRef } from 'react';
import { io } from 'socket.io-client';

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
    <div>
      <input type="text" placeholder='enter your stream key!!' value={streamKey} 
        onChange={(e) => setStreamKey(e.target.value)} />
      <video ref={videoRef} autoPlay muted></video>
      <button onClick={startStream}>Start Stream</button>
    </div>
  );
};

export default Dashboard;
