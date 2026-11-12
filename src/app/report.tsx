import { router } from 'expo-router';
import { BarrierReportScreen } from '../components/BarrierReportScreen';

export default function ReportRoute() {
  return <BarrierReportScreen onDone={() => router.replace('/')} />;
}
