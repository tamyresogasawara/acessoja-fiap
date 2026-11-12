import { router } from 'expo-router';
import { HomeScreen } from '../components/HomeScreen';

export default function HomeRoute() {
  return <HomeScreen onPlanRoute={() => router.push('/plan')} onReportBarrier={() => router.push('/report')} />;
}
