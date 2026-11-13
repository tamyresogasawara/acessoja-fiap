import { router, useLocalSearchParams } from 'expo-router';
import { RouteResultScreen } from '../components/RouteResultScreen';
import { candidateRoutes, type MobilityProfile } from '../lib/route-data';

function isProfile(value: unknown): value is MobilityProfile {
  return typeof value === 'string' && value in candidateRoutes;
}

export default function RouteResultRoute() {
  const { profile } = useLocalSearchParams<{ profile?: string }>();
  return <RouteResultScreen profile={isProfile(profile) ? profile : 'walking'} onHome={() => router.replace('/')} />;
}
