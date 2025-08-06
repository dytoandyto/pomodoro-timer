
import React from 'react';
import Focustimer from '@/components/FocusTimer';


export default function Home() {
  return ( 
    <div className="bg-white text-gray-500 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Pomodoro Timer</h1>
      <Focustimer />
    </div>
  );
}
