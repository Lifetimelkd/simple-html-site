import { useState } from "react";
import { User, Edit2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NumberCard from "./NumberCard";
import { cn } from "@/lib/utils";

interface PlayerCardProps {
  playerIndex: number;
  name: string;
  numbers: number[];
  onNameChange: (name: string) => void;
  onRemoveNumber: (number: number) => void;
}

const avatarColors = [
  "from-purple-500 to-blue-500",
  "from-cyan-500 to-green-500",
  "from-orange-500 to-red-500",
];

const avatarEmojis = ["🦊", "🐱", "🐼"];

const PlayerCard = ({ 
  playerIndex, 
  name, 
  numbers, 
  onNameChange, 
  onRemoveNumber 
}: PlayerCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [removingNumbers, setRemovingNumbers] = useState<number[]>([]);

  const handleSave = () => {
    onNameChange(editName);
    setIsEditing(false);
  };

  const handleRemove = (num: number) => {
    setRemovingNumbers(prev => [...prev, num]);
    setTimeout(() => {
      onRemoveNumber(num);
      setRemovingNumbers(prev => prev.filter(n => n !== num));
    }, 300);
  };

  return (
    <Card className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Avatar */}
          <div 
            className={cn(
              "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl",
              "bg-gradient-to-br shadow-lg",
              avatarColors[playerIndex]
            )}
          >
            {avatarEmojis[playerIndex]}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-8 text-base sm:text-lg font-semibold"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
                <button
                  onClick={handleSave}
                  className="p-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group/name">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground truncate">{name}</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 rounded-full opacity-0 group-hover/name:opacity-100 hover:bg-muted transition-all"
                >
                  <Edit2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
        {/* Number cards grid */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center min-h-[80px] sm:min-h-[100px]">
          {numbers.length > 0 ? (
            numbers.map((num, idx) => (
              <NumberCard
                key={num}
                number={num}
                onRemove={() => handleRemove(num)}
                delay={idx * 100}
                isRemoving={removingNumbers.includes(num)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-20 text-muted-foreground">
              <User className="w-6 h-6 mr-2 opacity-50" />
              <span>等待抽取...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
