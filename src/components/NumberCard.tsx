import { X } from "lucide-react";
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
  const gradientIndex = (number - 1) % gradientClasses.length;

  return (
    <div
      className={cn(
        "relative group w-16 h-20 md:w-20 md:h-24 rounded-xl",
        gradientClasses[gradientIndex],
        "flex items-center justify-center",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "hover:scale-110 hover:-translate-y-1",
        "cursor-pointer",
        "animate-[scale-in_0.5s_ease-out_forwards]",
        isRemoving && "animate-[fade-out_0.3s_ease-out_forwards]"
      )}
      style={{
        animationDelay: isRemoving ? "0ms" : `${delay}ms`,
        opacity: isRemoving ? 0 : undefined,
      }}
    >
      {/* Card content */}
      <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
        {number}
      </span>

      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className={cn(
          "absolute -top-2 -right-2",
          "w-6 h-6 rounded-full",
          "bg-destructive text-destructive-foreground",
          "flex items-center justify-center",
          "opacity-0 group-hover:opacity-100",
          "transition-all duration-200",
          "hover:scale-110",
          "shadow-md"
        )}
      >
        <X className="w-4 h-4" />
      </button>

      {/* Shine effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default NumberCard;
