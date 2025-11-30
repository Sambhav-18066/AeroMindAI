'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Background() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 -z-10 h-full w-full bg-background transition-colors duration-300',
        'bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(118,217,255,0.3),rgba(255,255,255,0))]',
        'dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(118,217,255,0.15),rgba(255,255,255,0))]'
      )}
    >
      <div className="absolute inset-0 -z-20 h-full w-full bg-neutral-100 dark:bg-neutral-950 bg-[radial-gradient(circle_500px_at_50%_200px,#e5f6ff,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#092333,transparent)]" />
      <div id="stars-container" className="absolute inset-0 h-full w-full">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
      </div>

      <style jsx>{`
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
        #stars-container {
          overflow: hidden;
        }
        #stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: ${theme === 'dark' ? getStars(500, 2000) : getStars(100, 2000, 'rgba(0,0,0,0.4)')};
          animation: animStar 50s linear infinite;
        }
        #stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${theme === 'dark' ? getStars(200, 2000) : getStars(50, 2000, 'rgba(0,0,0,0.4)')};
          animation: animStar 100s linear infinite;
        }
        #stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: ${theme === 'dark' ? getStars(50, 2000) : getStars(10, 2000, 'rgba(0,0,0,0.4)')};
          animation: animStar 150s linear infinite;
        }
      `}</style>
    </div>
  );
}

const getStars = (count: number, size: number, color = '#FFF') => {
  let stars = '';
  for (let i = 0; i < count; i++) {
    stars += `${Math.random() * size}px ${Math.random() * size}px ${color}${i < count - 1 ? ',' : ''}`;
  }
  return stars;
};
