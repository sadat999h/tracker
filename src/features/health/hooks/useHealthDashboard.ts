import { useEffect, useState } from 'react';
import { initializeDefaults } from '@/db/migrate';
import { getHabitsForToday, getMedications, getProfile, getWaterToday } from '@/features/health/data/healthRepository';

export function useHealthDashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ name: string } | null>(null);
  const [waterMl, setWaterMl] = useState(0);
  const [habits, setHabits] = useState<Awaited<ReturnType<typeof getHabitsForToday>>>([]);
  const [meds, setMeds] = useState<Awaited<ReturnType<typeof getMedications>>>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      await initializeDefaults();
      const p = await getProfile();
      const w = await getWaterToday();
      const h = await getHabitsForToday();
      const m = await getMedications();
      setProfile(p);
      setWaterMl(w);
      setHabits(h);
      setMeds(m);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Database error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return { loading, profile, waterMl, habits, meds, error, refresh };
}
