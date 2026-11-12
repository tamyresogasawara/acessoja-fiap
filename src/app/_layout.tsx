import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';

export default function RootLayout() {
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
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="plan" options={{ title: 'Plan route', headerBackTitle: 'Home' }} />
        <Stack.Screen name="route" options={{ title: 'Your route', headerBackTitle: 'Plan' }} />
        <Stack.Screen name="report" options={{ title: 'Report barrier', headerBackTitle: 'Home' }} />
      </Stack>
    </>
  );
}
