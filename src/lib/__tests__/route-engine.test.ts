import { chooseAccessibleRoute, fastestRoute, type AccessibleRoute } from '../route-engine';
import { candidateRoutes } from '../route-data';

const routes: AccessibleRoute[] = [
  { id: 'short', title: 'Rota mais curta', durationMinutes: 11, accessibilityScore: 62, barriers: 2 },
  { id: 'safe', title: 'Rota mais acessível', durationMinutes: 15, accessibilityScore: 94, barriers: 0 },
];

describe('chooseAccessibleRoute', () => {
  it('prioriza zero barreiras e acessibilidade acima do menor tempo', () => {
    expect(chooseAccessibleRoute(routes)).toEqual(routes[1]);
    expect(fastestRoute(routes)).toEqual(routes[0]);
  });

  it('usa a pontuação e depois o tempo como critérios de desempate', () => {
    const tied: AccessibleRoute[] = [
      { id: 'a', title: 'A', durationMinutes: 12, accessibilityScore: 90, barriers: 0 },
      { id: 'b', title: 'B', durationMinutes: 14, accessibilityScore: 93, barriers: 0 },
      { id: 'c', title: 'C', durationMinutes: 10, accessibilityScore: 93, barriers: 0 },
    ];
    expect(chooseAccessibleRoute(tied)?.id).toBe('c');
  });

  it('recomenda uma rota sem barreiras para todos os perfis simulados', () => {
    for (const candidates of Object.values(candidateRoutes)) {
      expect(chooseAccessibleRoute(candidates)?.barriers).toBe(0);
    }
  });

  it('retorna undefined quando não há rotas', () => {
    expect(chooseAccessibleRoute([])).toBeUndefined();
  });
});
