import { router } from 'expo-router';
import { RoutePlannerScreen } from '../components/RoutePlannerScreen';

export default function PlanRoute() {
  return <RoutePlannerScreen onRouteReady={(profile) => router.push({ pathname: '/route', params: { profile } })} />;
}
