/**
 * DEVELOPMENT-ONLY visual fixture. Phase 1 replaces this presentation data with
 * database queries and intentional empty states. Never import into persistence/AI.
 */
export const homeMock = {
  greeting: { name: 'Alex', date: 'Thursday, Oct 24 · Day 184 of 2024' },
  overview: { completed: 11, planned: 14, streak: 24, message: 'High cognitive endurance. 3 habitual triggers remaining for evening cadence.' },
  sequence: [
    { icon: '☾', time: '00:30', title: 'Rest & Recovery', detail: '6h 45m · 88%' },
    { icon: '♢', time: '07:30', title: 'Hydration Primer', detail: '500ml + Salts' },
    { icon: 'ϟ', time: '08:30', title: 'Deep Work I', detail: '2h 15m Flow' },
    { icon: '⌁', time: '12:00', title: 'Upper Hypertrophy', detail: '1h 10m · 14.8t' },
  ],
  metrics: [
    { label: 'Water', value: '2,250', unit: '/ 3,000 ml', detail: '+250 ml', progress: 0.75, icon: '♢' },
    { label: 'Medication', value: 'Morning Done', unit: '(2/2)', detail: 'Next: 20:30', icon: '•' },
    { label: 'Body Mass', value: '76.4', unit: 'kg', detail: '−0.3 kg yesterday', icon: '⌁' },
    { label: 'Workout', value: 'Push Hyper.', detail: '14,820 kg vol', icon: '⌁' },
    { label: 'Study & RS', value: '2h 40m', unit: '/ 3h', detail: 'Progress 88%', progress: 0.88, icon: '▤' },
    { label: 'Deep Work', value: '5h 15m', unit: '/ 6h', detail: 'Capacity 87%', progress: 0.87, icon: '▱' },
    { label: 'Sleep Metric', value: '7h 12m', detail: 'Quality index 88%', icon: '☾' },
    { label: 'Focus Sprints', value: '4', unit: 'sessions', detail: '110 mins deep focus', icon: '◴' },
  ],
  habits: [
    { title: 'Morning Sunlight', detail: '15 mins circadian alignment', state: 'DONE', checked: true },
    { title: 'Daily Cadence (10k Steps)', detail: '8,420 / 10,000 steps', state: '84%', checked: true },
    { title: 'Zero Sugar Integrity', detail: 'Metabolic discipline active', state: 'TRACKED', checked: true },
    { title: 'Reading Philosophy', detail: '30m evening session', state: 'PENDING', checked: false },
  ],
} as const;
