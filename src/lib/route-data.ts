import type { AccessibleRoute } from './route-engine';

export type MobilityProfile = 'wheelchair' | 'walking' | 'low-vision';

export type RouteStep = { title: string; detail: string; status: string };

export type RouteOption = AccessibleRoute & {
  distanceKm: number;
  stairs: number;
  verifiedMinutesAgo: number;
  barrierNotes: string[];
  steps: RouteStep[];
};

export const profileLabels: Record<MobilityProfile, string> = {
  wheelchair: 'cadeira de rodas',
  walking: 'mobilidade reduzida',
  'low-vision': 'baixa visão',
};

export const destination = {
  name: 'UBS Central',
  address: 'Av. Ana Costa, Santos',
  distanceKm: 1.1,
};

// Dados simulados: duas rotas candidatas por perfil. O motor de seleção
// (chooseAccessibleRoute) decide qual recomendar.
export const candidateRoutes: Record<MobilityProfile, RouteOption[]> = {
  wheelchair: [
    {
      id: 'wheelchair-fast',
      title: 'Rota mais curta',
      durationMinutes: 11,
      distanceKm: 0.9,
      accessibilityScore: 58,
      barriers: 2,
      stairs: 4,
      verifiedMinutesAgo: 40,
      barrierNotes: ['escada na entrada principal', 'meio-fio sem rebaixamento'],
      steps: [],
    },
    {
      id: 'wheelchair-safe',
      title: 'Rota sem degraus',
      durationMinutes: 15,
      distanceKm: 1.1,
      accessibilityScore: 94,
      barriers: 0,
      stairs: 0,
      verifiedMinutesAgo: 8,
      barrierNotes: [],
      steps: [
        { title: 'Siga pela calçada da direita', detail: 'Piso largo e nivelado por 350 m', status: 'Trecho acessível' },
        { title: 'Atravesse na Rua Bahia', detail: 'Meio-fio rebaixado dos dois lados', status: 'Travessia verificada' },
        { title: 'Use a entrada lateral', detail: 'Rampa ao lado da escada principal', status: 'Entrada sem degraus' },
      ],
    },
  ],
  walking: [
    {
      id: 'walking-fast',
      title: 'Rota mais curta',
      durationMinutes: 11,
      distanceKm: 0.9,
      accessibilityScore: 66,
      barriers: 1,
      stairs: 4,
      verifiedMinutesAgo: 40,
      barrierNotes: ['escada na entrada principal'],
      steps: [],
    },
    {
      id: 'walking-safe',
      title: 'Rota com menos esforço',
      durationMinutes: 13,
      distanceKm: 1.1,
      accessibilityScore: 91,
      barriers: 0,
      stairs: 0,
      verifiedMinutesAgo: 8,
      barrierNotes: [],
      steps: [
        { title: 'Siga pela calçada da direita', detail: 'Plana, com bancos a cada 150 m', status: 'Trecho com descanso' },
        { title: 'Atravesse na Rua Bahia', detail: 'Semáforo com tempo estendido', status: 'Travessia verificada' },
        { title: 'Use a entrada lateral', detail: 'Rampa com corrimão dos dois lados', status: 'Entrada sem degraus' },
      ],
    },
  ],
  'low-vision': [
    {
      id: 'low-vision-fast',
      title: 'Rota mais curta',
      durationMinutes: 11,
      distanceKm: 0.9,
      accessibilityScore: 61,
      barriers: 2,
      stairs: 4,
      verifiedMinutesAgo: 40,
      barrierNotes: ['travessia sem sinal sonoro', 'calçada sem piso tátil'],
      steps: [],
    },
    {
      id: 'low-vision-safe',
      title: 'Rota com piso tátil',
      durationMinutes: 14,
      distanceKm: 1.1,
      accessibilityScore: 92,
      barriers: 0,
      stairs: 0,
      verifiedMinutesAgo: 8,
      barrierNotes: [],
      steps: [
        { title: 'Siga o piso tátil da direita', detail: 'Faixa contínua por 350 m, sem obstáculos', status: 'Trecho com piso tátil' },
        { title: 'Atravesse na Rua Bahia', detail: 'Semáforo com sinal sonoro', status: 'Travessia verificada' },
        { title: 'Use a entrada lateral', detail: 'Piso de alerta antes da porta', status: 'Entrada sinalizada' },
      ],
    },
  ],
};
