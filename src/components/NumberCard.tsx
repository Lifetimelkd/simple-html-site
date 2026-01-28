import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface NumberCardProps {
  number: number;
  onRemove: () => void;
  delay?: number;
  isRemoving?: boolean;
}

// Get ball class based on number (1-15 billiard ball colors)
const getBallClass = (number: number): string => {
  return `ball-${number}`;
};

// Check if it's a stripe ball (9-15) for text color
const isStripeBall = (number: number): boolean => {
  return number >= 9 && number <= 15;
};

// Check if it's the 8 ball (black) for white text
const isDarkBall = (number: number): boolean => {
  return number === 8;
};

const NumberCard = ({ number, onRemove, delay = 0, isRemoving = false }: NumberCardProps) => {
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [isShattering, setIsShattering] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const ballClass = getBallClass(number);

  const handlePressStart = () => {
    setIsLongPressing(true);
    longPressTimer.current = setTimeout(() => {
      setIsLongPressing(false);
      setIsShattering(true);
      // After shatter animation, trigger remove
      setTimeout(() => {
        onRemove();
      }, 600);
    }, 800); // 800ms long press
  };

  const handlePressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setIsLongPressing(false);
  };

  return (
    <div
      className={cn(
        "relative w-14 h-18 sm:w-16 sm:h-20 md:w-20 md:h-24",
        "cursor-pointer select-none",
        "animate-[scale-in_0.5s_ease-out_forwards]",
        isRemoving && "animate-[fade-out_0.3s_ease-out_forwards]"
      )}
      style={{
        animationDelay: isRemoving ? "0ms" : `${delay}ms`,
        opacity: isRemoving ? 0 : undefined,
      }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      {/* Main card */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl",
          ballClass,
          "flex items-center justify-center",
          "shadow-lg transition-all duration-300",
          "hover:shadow-xl hover:scale-110 hover:-translate-y-1",
          isLongPressing && "scale-95 shake",
          isShattering && "opacity-0"
        )}
      >
        {/* Number with circle background for stripe balls */}
        <div className={cn(
          "flex items-center justify-center",
          isStripeBall(number) && "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white"
        )}>
          <span className={cn(
            "text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg",
            isDarkBall(number) ? "text-white" : "text-gray-900",
            isStripeBall(number) && "text-gray-900 drop-shadow-none"
          )}>
            {number}
          </span>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
        
        {/* Long press progress indicator */}
        {isLongPressing && (
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
              <div className="h-full bg-white animate-[progress_0.8s_linear_forwards]" />
            </div>
          </div>
        )}
      </div>

      {/* Shatter pieces */}
      {isShattering && (
        <>
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute rounded-sm",
                ballClass,
                "animate-shatter-piece"
              )}
              style={{
                width: `${Math.random() * 12 + 8}px`,
                height: `${Math.random() * 12 + 8}px`,
                left: `${(i % 3) * 33 + Math.random() * 10}%`,
                top: `${Math.floor(i / 3) * 33 + Math.random() * 10}%`,
                animationDelay: `${i * 30}ms`,
                "--tx": `${(Math.random() - 0.5) * 150}px`,
                "--ty": `${Math.random() * -100 - 50}px`,
                "--r": `${(Math.random() - 0.5) * 720}deg`,
              } as React.CSSProperties}
            />
          ))}
        </>
      )}

    </div>
  );
};

export default NumberCard;
