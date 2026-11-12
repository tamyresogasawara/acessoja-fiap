import { chooseAccessibleRoute, type AccessibleRoute } from '../route-engine';

const routes: AccessibleRoute[] = [
  {
    id: 'short',
    title: 'Fastest route',
    durationMinutes: 11,
    accessibilityScore: 62,
    barriers: 2,
  },
  {
    id: 'safe',
    title: 'Most accessible route',
    durationMinutes: 15,
    accessibilityScore: 94,
    barriers: 0,
  },
];

describe('chooseAccessibleRoute', () => {
  it('prioritizes accessibility and zero barriers over the shortest duration', () => {
    expect(chooseAccessibleRoute(routes)).toEqual(routes[1]);
  });

  it('returns undefined when no route is available', () => {
    expect(chooseAccessibleRoute([])).toBeUndefined();
  });
});
