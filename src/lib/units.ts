export type UnitSystem = 'metric' | 'imperial';

export function kgToLb(kg: number): number {
  return Number((kg * 2.20462).toFixed(1));
}

export function lbToKg(lb: number): number {
  return Number((lb / 2.20462).toFixed(2));
}

export function mlToFlOz(ml: number): number {
  return Number((ml * 0.033814).toFixed(1));
}

export function flOzToMl(oz: number): number {
  return Math.round(oz * 29.5735);
}

export function formatWeight(kg: number, system: UnitSystem): string {
  if (system === 'imperial') {
    return `${kgToLb(kg)} lb`;
  }
  return `${kg.toFixed(1)} kg`;
}

export function formatWater(ml: number, system: UnitSystem): string {
  if (system === 'imperial') {
    return `${mlToFlOz(ml)} fl oz`;
  }
  return `${ml.toLocaleString()} ml`;
}
