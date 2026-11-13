export type AccessibleRoute = {
  id: string;
  title: string;
  durationMinutes: number;
  accessibilityScore: number;
  barriers: number;
};

/**
 * Escolhe a rota recomendada. Critérios, em ordem:
 * 1. menor número de barreiras;
 * 2. maior pontuação de acessibilidade;
 * 3. menor tempo.
 * Uma rota um pouco mais longa vence quando é mais segura.
 */
export function chooseAccessibleRoute<T extends AccessibleRoute>(routes: T[]): T | undefined {
  return [...routes].sort((a, b) => {
    const barrierDifference = a.barriers - b.barriers;
    if (barrierDifference !== 0) return barrierDifference;

    const accessibilityDifference = b.accessibilityScore - a.accessibilityScore;
    if (accessibilityDifference !== 0) return accessibilityDifference;

    return a.durationMinutes - b.durationMinutes;
  })[0];
}

/** Rota mais rápida entre as candidatas — usada para explicar a recomendação. */
export function fastestRoute<T extends AccessibleRoute>(routes: T[]): T | undefined {
  return [...routes].sort((a, b) => a.durationMinutes - b.durationMinutes)[0];
}
