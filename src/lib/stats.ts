export function calculatePearsonCorrelation(x: number[], y: number[]): { r: number; n: number; reliable: boolean } {
  const n = Math.min(x.length, y.length);
  if (n < 14) {
    return { r: 0, n, reliable: false };
  }

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * (y[i] ?? 0), 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return { r: 0, n, reliable: true };

  const r = Number((numerator / denominator).toFixed(2));
  return { r, n, reliable: true };
}
