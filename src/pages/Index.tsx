import { useState, useCallback } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import NumberWheel from "@/components/NumberWheel";
import PlayerCard from "@/components/PlayerCard";

interface Player {
  name: string;
  numbers: number[];
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [players, setPlayers] = useState<Player[]>([
    { name: "玩家一", numbers: [] },
    { name: "玩家二", numbers: [] },
    { name: "玩家三", numbers: [] },
  ]);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Generate and shuffle numbers 1-15
    const allNumbers = shuffleArray(Array.from({ length: 15 }, (_, i) => i + 1));

    // Distribute to 3 players (5 each)
    setTimeout(() => {
      setPlayers(prev => prev.map((player, idx) => ({
        ...player,
        numbers: allNumbers.slice(idx * 5, (idx + 1) * 5).sort((a, b) => a - b),
      })));
      setIsSpinning(false);
      setHasDrawn(true);
    }, 3000);
  }, [isSpinning]);

  const handleReset = () => {
    setPlayers(prev => prev.map(player => ({
      ...player,
      numbers: [],
    })));
    setHasDrawn(false);
  };

  const handleNameChange = (index: number, name: string) => {
    setPlayers(prev => prev.map((player, idx) => 
      idx === index ? { ...player, name } : player
    ));
  };

  const handleRemoveNumber = (playerIndex: number, number: number) => {
    setPlayers(prev => prev.map((player, idx) => 
      idx === playerIndex 
        ? { ...player, numbers: player.numbers.filter(n => n !== number) }
        : player
    ));
  };

  return (
    <div className="min-h-screen py-4 px-3 sm:py-6 sm:px-4 md:py-10 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
        {/* Header */}
        <header className="text-center space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold gradient-text">
              数字抽取转盘
            </h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
          </div>
          <p className="text-sm sm:text-lg text-muted-foreground px-2">
            点击转盘中心开始抽取，15个数字将随机分配给3位玩家
          </p>
        </header>

        {/* Wheel Section */}
        <section className="flex justify-center py-2 sm:py-4 md:py-8">
          <NumberWheel 
            isSpinning={isSpinning} 
            onSpin={handleSpin}
            hasDrawn={hasDrawn}
          />
        </section>

        {/* Players Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {players.map((player, index) => (
            <PlayerCard
              key={index}
              playerIndex={index}
              name={player.name}
              numbers={player.numbers}
              onNameChange={(name) => handleNameChange(index, name)}
              onRemoveNumber={(number) => handleRemoveNumber(index, number)}
            />
          ))}
        </section>

        {/* Action Buttons */}
        <footer className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleReset}
            disabled={isSpinning || !hasDrawn}
            className="gap-2 glass hover:bg-white/50"
          >
            <RotateCcw className="w-5 h-5" />
            重置
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Index;
