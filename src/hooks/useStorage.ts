import { useState, useEffect } from 'react';
import { GameSave, loadGame } from '../store/gameStore';

export function useGameSave() {
  const [save, setSave] = useState<GameSave | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGame().then((data) => {
      setSave(data);
      setLoading(false);
    });
  }, []);

  return { save, setSave, loading };
}
