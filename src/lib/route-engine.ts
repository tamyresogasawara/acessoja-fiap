export type AccessibleRoute = {
  id: string;
  title: string;
  durationMinutes: number;
  accessibilityScore: number;
  barriers: number;
};

export function chooseAccessibleRoute(routes: AccessibleRoute[]) {
  return [...routes].sort((a, b) => {
    const barrierDifference = a.barriers - b.barriers;
    if (barrierDifference !== 0) return barrierDifference;

    const accessibilityDifference = b.accessibilityScore - a.accessibilityScore;
    if (accessibilityDifference !== 0) return accessibilityDifference;

    return a.durationMinutes - b.durationMinutes;
  })[0];
}
