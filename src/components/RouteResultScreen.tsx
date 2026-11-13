import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { colors, spacing } from '../theme';
import { candidateRoutes, destination, profileLabels, type MobilityProfile } from '../lib/route-data';
import { chooseAccessibleRoute, fastestRoute } from '../lib/route-engine';
import { useReduceMotion } from '../lib/use-reduce-motion';

type Props = { profile: MobilityProfile; onHome: () => void };

const km = (value: number) => value.toString().replace('.', ',');

export function RouteResultScreen({ profile, onHome }: Props) {
  const reduceMotion = useReduceMotion();
  const [saved, setSaved] = useState(false);
  const [started, setStarted] = useState(false);
  const entrance = useRef(new Animated.Value(0)).current;
  const scoreFill = useRef(new Animated.Value(0)).current;

  const candidates = candidateRoutes[profile] ?? candidateRoutes.walking;
  const route = chooseAccessibleRoute(candidates)!;
  const fastest = fastestRoute(candidates)!;
  const extraMinutes = route.durationMinutes - fastest.durationMinutes;

  // Motion funcional: o resultado entra de baixo para cima (mudança de estado)
  // e a barra de pontuação se preenche até o valor real, reforçando o número.
  useEffect(() => {
    if (reduceMotion) {
      entrance.setValue(1);
      scoreFill.setValue(route.accessibilityScore);
      return;
    }
    Animated.sequence([
      Animated.timing(entrance, { toValue: 1, duration: 360, useNativeDriver: true }),
      Animated.timing(scoreFill, { toValue: route.accessibilityScore, duration: 700, useNativeDriver: false }),
    ]).start();
  }, [reduceMotion, entrance, scoreFill, route.accessibilityScore]);

  function startNavigation() {
    setStarted(true);
    AccessibilityInfo.announceForAccessibility(`Navegação iniciada. ${route.steps[0]?.title}.`);
  }

  function saveOffline() {
    setSaved(true);
    AccessibilityInfo.announceForAccessibility('Rota salva para uso sem internet.');
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Animated.View
        style={{
          opacity: entrance,
          transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
        }}
      >
        <Text style={styles.eyebrow}>ROTA MAIS SEGURA ENCONTRADA</Text>
        <Text accessibilityRole="header" style={styles.title}>{destination.name}</Text>
        <Text style={styles.profile}>Otimizada para: {profileLabels[profile] ?? profileLabels.walking}</Text>

        <View
          style={styles.scoreCard}
          accessible
          accessibilityLabel={`Pontuação de acessibilidade ${route.accessibilityScore} de 100. ${
            route.barriers === 0 ? 'Nenhuma barreira relatada' : `${route.barriers} barreiras`
          }. Verificada há ${route.verifiedMinutesAgo} minutos.`}
        >
          <View style={styles.scoreHeader}>
            <View style={styles.scoreCopy}>
              <Text style={styles.scoreLabel}>PONTUAÇÃO DE ACESSIBILIDADE</Text>
              <Text style={styles.score}>
                {route.accessibilityScore}
                <Text style={styles.scoreOutOf}>/100</Text>
              </Text>
            </View>
            <View style={styles.verifiedBadge}><Text style={styles.verifiedText}>VERIFICADA ✓</Text></View>
          </View>
          <View style={styles.scoreTrack}>
            <Animated.View
              style={[
                styles.scoreFill,
                { width: scoreFill.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) },
              ]}
            />
          </View>
          <Text style={styles.scoreSummary}>
            {route.barriers === 0 ? 'Nenhuma barreira relatada' : `${route.barriers} barreiras`} · verificada há{' '}
            {route.verifiedMinutesAgo} min
          </Text>
        </View>

        <View
          style={styles.whyCard}
          accessible
          accessibilityLabel={`Por que esta rota? A rota mais curta leva ${fastest.durationMinutes} minutos, mas tem ${fastest.barriers} barreiras: ${fastest.barrierNotes.join(' e ')}. Esta leva ${extraMinutes} minutos a mais e não tem barreiras.`}
        >
          <Text style={styles.whyTitle}>Por que esta rota?</Text>
          <Text style={styles.whyText}>
            A rota mais curta leva {fastest.durationMinutes} min, mas tem {fastest.barriers}{' '}
            {fastest.barriers === 1 ? 'barreira' : 'barreiras'}: {fastest.barrierNotes.join(' e ')}.
          </Text>
          <Text style={styles.whyHighlight}>
            Esta leva +{extraMinutes} min e tem 0 barreiras.
          </Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat} accessible accessibilityLabel={`Tempo estimado: ${route.durationMinutes} minutos`}>
            <Text style={styles.statValue}>{route.durationMinutes} min</Text>
            <Text style={styles.statLabel}>estimado</Text>
          </View>
          <View style={styles.stat} accessible accessibilityLabel={`Distância: ${km(route.distanceKm)} quilômetro`}>
            <Text style={styles.statValue}>{km(route.distanceKm)} km</Text>
            <Text style={styles.statLabel}>distância</Text>
          </View>
          <View style={styles.stat} accessible accessibilityLabel={`${route.stairs} degraus no caminho`}>
            <Text style={styles.statValue}>{route.stairs}</Text>
            <Text style={styles.statLabel}>degraus</Text>
          </View>
        </View>

        <Text accessibilityRole="header" style={styles.sectionTitle}>Orientação passo a passo</Text>
        {route.steps.map((step, index) => (
          <View
            key={step.title}
            style={styles.stepRow}
            accessible
            accessibilityLabel={`Passo ${index + 1}: ${step.title}. ${step.detail}. ${step.status}.`}
          >
            <View style={styles.timeline}>
              <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{index + 1}</Text></View>
              {index < route.steps.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.stepCard}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDetail}>{step.detail}</Text>
              <Text style={styles.stepStatus}>{step.status} ✓</Text>
            </View>
          </View>
        ))}

        {started && (
          <View style={styles.liveBanner} accessibilityLiveRegion="polite">
            <Text style={styles.liveTitle}>Navegação iniciada</Text>
            <Text style={styles.liveText}>Primeira instrução: {route.steps[0]?.title.toLowerCase()}.</Text>
          </View>
        )}
        <ActionButton
          label={started ? 'Navegação ativa ✓' : 'Iniciar navegação'}
          accessibilityLabel={started ? 'Navegação acessível ativa' : 'Iniciar navegação acessível'}
          onPress={startNavigation}
          style={styles.primaryAction}
        />
        <ActionButton
          label={saved ? 'Rota salva ✓' : 'Salvar para usar offline'}
          accessibilityLabel={saved ? 'Rota salva para uso sem internet' : 'Salvar rota para uso sem internet'}
          onPress={saveOffline}
          variant="secondary"
          style={styles.secondaryAction}
        />
        <ActionButton label="Voltar ao início" accessibilityLabel="Voltar à tela inicial" onPress={onHome} variant="secondary" style={styles.secondaryAction} />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.cream },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: spacing.lg, paddingTop: 34, paddingBottom: 48 },
  eyebrow: { color: colors.orangeText, fontSize: 13, fontWeight: '900', letterSpacing: 1.4 },
  title: { color: colors.ink, fontSize: 34, lineHeight: 40, fontWeight: '900', marginTop: 8 },
  profile: { color: colors.gray, fontSize: 15, marginTop: 6, marginBottom: 22 },
  scoreCard: { backgroundColor: colors.ink, borderRadius: 24, padding: 22 },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  scoreCopy: { flex: 1 },
  scoreLabel: { color: '#A9C9BB', fontSize: 12, fontWeight: '900', letterSpacing: 1.2 },
  score: { color: colors.white, fontSize: 42, fontWeight: '900', marginTop: 4 },
  scoreOutOf: { color: '#A9C9BB', fontSize: 18 },
  verifiedBadge: { backgroundColor: colors.mint, borderRadius: 99, paddingVertical: 7, paddingHorizontal: 10 },
  verifiedText: { color: colors.forest, fontSize: 12, fontWeight: '900' },
  scoreTrack: { height: 10, borderRadius: 99, backgroundColor: '#42584F', marginTop: 16, overflow: 'hidden' },
  scoreFill: { height: '100%', backgroundColor: '#76DBA5', borderRadius: 99 },
  scoreSummary: { color: '#D9E4DF', fontSize: 14, marginTop: 12 },
  whyCard: { backgroundColor: colors.white, borderRadius: 20, borderWidth: 2, borderColor: colors.forest, padding: 18, marginTop: 14 },
  whyTitle: { color: colors.ink, fontSize: 17, fontWeight: '900' },
  whyText: { color: colors.gray, fontSize: 15, lineHeight: 22, marginTop: 6 },
  whyHighlight: { color: colors.forest, fontSize: 15, fontWeight: '900', marginTop: 8 },
  stats: { flexDirection: 'row', marginVertical: 18, gap: 8 },
  stat: { flex: 1, backgroundColor: colors.white, borderRadius: 16, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.line },
  statValue: { color: colors.ink, fontSize: 17, fontWeight: '900' },
  statLabel: { color: colors.gray, fontSize: 13, marginTop: 3 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '900', marginBottom: 14 },
  stepRow: { flexDirection: 'row', minHeight: 112 },
  timeline: { width: 42, alignItems: 'center' },
  stepNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.forest, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { color: colors.white, fontSize: 14, fontWeight: '900' },
  timelineLine: { flex: 1, width: 3, backgroundColor: colors.line },
  stepCard: { flex: 1, backgroundColor: colors.white, borderRadius: 18, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: colors.line },
  stepTitle: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  stepDetail: { color: colors.gray, fontSize: 15, lineHeight: 21, marginTop: 4 },
  stepStatus: { color: colors.forest, fontSize: 13, fontWeight: '900', marginTop: 8 },
  liveBanner: { backgroundColor: colors.orangeSoft, borderLeftWidth: 5, borderLeftColor: colors.orangeText, borderRadius: 16, padding: 16, marginTop: 8 },
  liveTitle: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  liveText: { color: colors.gray, fontSize: 15, lineHeight: 21, marginTop: 4 },
  primaryAction: { marginTop: 18 },
  secondaryAction: { marginTop: 10 },
});
