import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface NumberCardProps {
  number: number;
  onRemove: () => void;
  delay?: number;
  isRemoving?: boolean;
}

const gradientClasses = [
  "card-gradient-1",
  "card-gradient-2",
  "card-gradient-3",
  "card-gradient-4",
  "card-gradient-5",
  "card-gradient-6",
  "card-gradient-7",
  "card-gradient-8",
];

const NumberCard = ({ number, onRemove, delay = 0, isRemoving = false }: NumberCardProps) => {
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [isShattering, setIsShattering] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const gradientIndex = (number - 1) % gradientClasses.length;

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
        "relative w-16 h-20 md:w-20 md:h-24",
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
          gradientClasses[gradientIndex],
          "flex items-center justify-center",
          "shadow-lg transition-all duration-300",
          "hover:shadow-xl hover:scale-110 hover:-translate-y-1",
          isLongPressing && "scale-95 shake",
          isShattering && "opacity-0"
        )}
      >
        <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
          {number}
        </span>
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
                gradientClasses[gradientIndex],
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

      {/* Hint text */}
      <div className={cn(
        "absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap",
        "text-xs text-muted-foreground opacity-0 transition-opacity",
        isLongPressing && "opacity-100"
      )}>
        长按消除中...
      </div>
    </div>
  );
};

export default NumberCard;
