"use client";
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Image from "next/image";

export default function HackathonTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isOver, setIsOver] = useState(false);
  
  // Parse start time
  const startDate = new Date('2025-05-03T18:30:00');
  // Calculate end time (36 hours later)
  const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate - now;
      
      if (difference <= 0) {
        clearInterval(timer);
        setIsOver(true);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative flex flex-col min-h-screen w-full items-center justify-center text-white px-4">
      {/* Top center image */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
        <Image 
          src="/3.png" 
          width={200} 
          height={200} 
          alt="Top Center Image" 
          className="drop-shadow-xl rounded-lg w-32 sm:w-40 md:w-48 lg:w-56"
          priority
        />
      </div>
      
      <div className="max-w-lg w-full mt-24 sm:mt-5 p-4 sm:p-6 md:p-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="flex justify-center">
          <Image 
            src="/images/logo.png" 
            width={400} 
            height={150} 
            alt="HackHerVerse Logo" 
            className="mb-4 p-2 drop-shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md" 
            priority
          />
        </div>
        
        <div className="flex flex-col w-full">
          {isOver ? (
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-pulse text-center">
                TIME'S UP!
              </div>
              <div className="text-xl sm:text-2xl font-semibold bg-pink-500 p-4 rounded-lg border-4 border-pink-300 text-center">
                THE EVENT IS OVER
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8">
                <TimeBlock value={timeLeft.days} label="Days" />
                <TimeBlock value={timeLeft.hours} label="Hours" />
                <TimeBlock value={timeLeft.minutes} label="Min" />
                <TimeBlock value={timeLeft.seconds} label="Sec" />
              </div>
              <div className="w-full bg-pink-200 rounded-full h-3 sm:h-4 mb-6">
                <div 
                  className="bg-pink-500 h-3 sm:h-4 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${calculateProgress(startDate, endDate)}%` 
                  }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-pink-800 text-white text-2xl sm:text-3xl md:text-4xl font-bold p-2 sm:p-3 md:p-4 rounded-lg w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border-2 sm:border-4 border-pink-300">
        {value}
      </div>
      <div className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">{label}</div>
    </div>
  );
}

function calculateProgress(startDate, endDate) {
  const now = new Date();
  const total = endDate - startDate;
  const elapsed = now - startDate;
  
  if (elapsed <= 0) return 0;
  if (elapsed >= total) return 100;
  
  return Math.floor((elapsed / total) * 100);
}
