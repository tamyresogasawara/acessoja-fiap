import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';
import { useReduceMotion } from '../lib/use-reduce-motion';

export default function RootLayout() {
  const reduceMotion = useReduceMotion();

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.cream },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontWeight: '800' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.cream },
          // Transição lateral indica avanço na jornada; desativada com "Reduzir movimento".
          animation: reduceMotion ? 'none' : 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false, title: 'Início' }} />
        <Stack.Screen name="plan" options={{ title: 'Planejar rota', headerBackTitle: 'Início' }} />
        <Stack.Screen name="route" options={{ title: 'Sua rota', headerBackTitle: 'Planejar' }} />
        <Stack.Screen name="report" options={{ title: 'Relatar barreira', headerBackTitle: 'Início' }} />
      </Stack>
    </>
  );
}
