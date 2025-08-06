"use client";

import React from 'react';
import useTimer from '@/hooks/use-timer';
import { time } from 'console';

export default function Focustimer() {
  const { mode, timeLeft, toggleTimer, isActive, resetTimer, switchMode, sessions } = useTimer();


  // Format time as MM::SS
  const minutes = Math.floor(timeLeft / 60);
  //1m * timeLeft = 60s
  //m * timeLeft = 60s
  //m = timeLeft/60s
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;



  return <div className='max-w-sm bg-white shadow-xl w-full p-6 rounded-xl'>
    <div className='flex items-center justify-between mb-4'>
      <h2 className="text-xl font-medium capitalize">
        {mode === 'focus' ? '🎯Focus Timer' : '🍵Break Timer'}
      </h2>
      <div className="text-sm text-gray-500">Sessions: {sessions}</div>
    </div>

    <div className={`text-center text-6xl font-bold mb-6 
      ${mode === 'focus' ? 'text-red-500' : 'text-green-500'}`}>
      {formattedTime}
    </div>

    <div className="flex justify-center space-x-4 mb-4">
      <button onClick={toggleTimer} className={`px-5 py-2 rounded-lg font-medium ${isActive
          ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={resetTimer} className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg ">
        Reset
      </button>
    </div>

    <button onClick={switchMode} className="py-2 w-full bg-gray-100 hover:bg-gray-200 px-5 rounded-lg text-gray-700">
      Switch to {mode === 'focus' ? 'Break' : 'Focus'}
    </button>
  </div>
}
