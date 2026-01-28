import { cn } from "@/lib/utils";

interface NumberWheelProps {
  isSpinning: boolean;
  onSpin: () => void;
  hasDrawn: boolean;
}

const NumberWheel = ({ isSpinning, onSpin, hasDrawn }: NumberWheelProps) => {
  const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
  const segmentAngle = 360 / 15;

  const gradientColors = [
    "hsl(270, 95%, 65%)", // purple
    "hsl(250, 95%, 65%)",
    "hsl(230, 100%, 60%)",
    "hsl(210, 100%, 60%)", // blue
    "hsl(190, 100%, 55%)",
    "hsl(180, 100%, 50%)", // cyan
    "hsl(160, 90%, 50%)",
    "hsl(140, 80%, 50%)", // green
    "hsl(100, 80%, 50%)",
    "hsl(60, 90%, 50%)",
    "hsl(45, 100%, 55%)", // yellow
    "hsl(35, 100%, 55%)",
    "hsl(25, 100%, 55%)", // orange
    "hsl(10, 95%, 58%)",
    "hsl(0, 90%, 60%)", // red
  ];

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] rounded-full bg-gradient-to-r from-primary via-purple-400 to-pink-400 opacity-50 blur-xl animate-pulse" />
      
      {/* Wheel container */}
      <div 
        className={cn(
          "relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] rounded-full glass shadow-2xl transition-transform duration-[3000ms] ease-out",
          isSpinning && "animate-[spin_3s_cubic-bezier(0.17,0.67,0.12,0.99)]"
        )}
        style={{
          transform: isSpinning ? `rotate(${Math.random() * 360 + 1440}deg)` : "rotate(0deg)",
        }}
      >
        {/* Number segments */}
        {numbers.map((num, index) => {
          const angle = index * segmentAngle - 90;
          const radius = 80;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={num}
              className="absolute font-bold text-base sm:text-lg md:text-xl transition-all duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                color: gradientColors[index],
                textShadow: `0 0 10px ${gradientColors[index]}`,
              }}
            >
              {num}
            </div>
          );
        })}

        {/* Inner decorative ring */}
        <div className="absolute inset-6 sm:inset-8 md:inset-10 rounded-full bg-gradient-to-br from-white/80 to-white/40 shadow-inner" />
      </div>

      {/* Center button */}
      <button
        onClick={onSpin}
        disabled={isSpinning}
        className={cn(
          "absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full",
          "bg-gradient-to-br from-primary via-purple-500 to-pink-500",
          "text-white font-bold text-base sm:text-lg md:text-xl",
          "shadow-lg hover:shadow-2xl",
          "transition-all duration-300",
          "hover:scale-105 active:scale-95",
          "disabled:opacity-70 disabled:cursor-not-allowed",
          "flex items-center justify-center",
          "border-4 border-white/50"
        )}
      >
        {isSpinning ? "抽取中..." : hasDrawn ? "重新抽" : "开始抽"}
      </button>
    </div>
  );
};

export default NumberWheel;
