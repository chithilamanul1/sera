'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;

    return (
        <div className="flex items-center gap-4">
            <Clock className={`w-5 h-5 ${isUrgent ? 'text-red-500' : 'text-white/70'}`} />
            <div className="flex gap-3">
                {timeLeft.days > 0 && (
                    <div className="text-center">
                        <div className={`text-2xl font-bold ${isUrgent ? 'text-red-500' : 'text-white'}`}>
                            {String(timeLeft.days).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-white/60 uppercase">Days</div>
                    </div>
                )}
                <div className="text-center">
                    <div className={`text-2xl font-bold ${isUrgent ? 'text-red-500' : 'text-white'}`}>
                        {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-white/60 uppercase">Hours</div>
                </div>
                <div className="text-center">
                    <div className={`text-2xl font-bold ${isUrgent ? 'text-red-500' : 'text-white'}`}>
                        {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-white/60 uppercase">Mins</div>
                </div>
                <div className="text-center">
                    <div className={`text-2xl font-bold ${isUrgent ? 'text-red-500' : 'text-white'}`}>
                        {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-white/60 uppercase">Secs</div>
                </div>
            </div>
            {isUrgent && (
                <span className="ml-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                    LAST CHANCE!
                </span>
            )}
        </div>
    );
}
