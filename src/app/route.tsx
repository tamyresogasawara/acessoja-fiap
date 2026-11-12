import { router, useLocalSearchParams } from 'expo-router';
import { RouteResultScreen } from '../components/RouteResultScreen';
import type { MobilityProfile } from '../components/RoutePlannerScreen';

export default function RouteResultRoute() {
  const { profile } = useLocalSearchParams<{ profile?: MobilityProfile }>();
  return <RouteResultScreen profile={profile ?? 'walking'} onHome={() => router.replace('/')} />;
}
