import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { colors, spacing } from '../theme';
import type { MobilityProfile } from './RoutePlannerScreen';

const steps = [
  { title: 'Follow the right sidewalk', detail: 'Wide, level surface for 350 m', status: 'Accessible segment' },
  { title: 'Cross at Rua Bahia', detail: 'Audible signal and lowered curb', status: 'Verified crossing' },
  { title: 'Use the side entrance', detail: 'Ramp beside the main stairs', status: 'Step-free entrance' },
];

type Props = { profile: MobilityProfile; onHome: () => void };

export function RouteResultScreen({ profile, onHome }: Props) {
  const [saved, setSaved] = useState(false);
  const [started, setStarted] = useState(false);
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
      if (!active) return;
      if (reduceMotion) entrance.setValue(1);
      else Animated.timing(entrance, { toValue: 1, duration: 360, useNativeDriver: true }).start();
    });
    return () => { active = false; };
  }, [entrance]);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Animated.View style={{ opacity: entrance, transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] }}>
        <Text style={styles.eyebrow}>SAFEST ROUTE FOUND</Text>
        <Text accessibilityRole="header" style={styles.title}>Central Health Clinic</Text>
        <Text style={styles.profile}>Optimized for: {profile === 'wheelchair' ? 'wheelchair' : profile === 'low-vision' ? 'low vision' : 'reduced mobility'}</Text>

        <View style={styles.scoreCard} accessible accessibilityLabel="Accessibility score 94 out of 100, no reported barriers, last verified 8 minutes ago">
          <View style={styles.scoreHeader}>
            <View>
              <Text style={styles.scoreLabel}>ACCESSIBILITY SCORE</Text>
              <Text style={styles.score}>94<Text style={styles.scoreOutOf}>/100</Text></Text>
            </View>
            <View style={styles.verifiedBadge}><Text style={styles.verifiedText}>VERIFIED ✓</Text></View>
          </View>
          <View style={styles.scoreTrack}><View style={styles.scoreFill} /></View>
          <Text style={styles.scoreSummary}>No reported barriers · checked 8 min ago</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}><Text style={styles.statValue}>15 min</Text><Text style={styles.statLabel}>estimated</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>1.1 km</Text><Text style={styles.statLabel}>distance</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>0</Text><Text style={styles.statLabel}>stairs</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Step-by-step guidance</Text>
        {steps.map((step, index) => (
          <View key={step.title} style={styles.stepRow} accessible accessibilityLabel={`Step ${index + 1}: ${step.title}. ${step.detail}. ${step.status}.`}>
            <View style={styles.timeline}>
              <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{index + 1}</Text></View>
              {index < steps.length - 1 && <View style={styles.timelineLine} />}
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
            <Text style={styles.liveTitle}>Navigation started</Text>
            <Text style={styles.liveText}>First instruction: follow the right sidewalk for 350 m.</Text>
          </View>
        )}
        <ActionButton
          label={started ? 'Navigation active' : 'Start navigation'}
          accessibilityLabel="Start accessible navigation"
          onPress={() => setStarted(true)}
          style={styles.primaryAction}
        />
        <ActionButton
          label={saved ? 'Route saved ✓' : 'Save for offline use'}
          accessibilityLabel={saved ? 'Route saved for offline use' : 'Save route for offline use'}
          onPress={() => setSaved(true)}
          variant="secondary"
          style={styles.secondaryAction}
        />
        <ActionButton label="Return home" accessibilityLabel="Return to home" onPress={onHome} variant="secondary" style={styles.secondaryAction} />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.cream },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: spacing.lg, paddingTop: 34, paddingBottom: 48 },
  eyebrow: { color: colors.orange, fontSize: 12, fontWeight: '900', letterSpacing: 1.4 },
  title: { color: colors.ink, fontSize: 34, lineHeight: 40, fontWeight: '900', marginTop: 8 },
  profile: { color: colors.gray, fontSize: 14, marginTop: 6, marginBottom: 22 },
  scoreCard: { backgroundColor: colors.ink, borderRadius: 24, padding: 22 },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  scoreLabel: { color: '#A9C9BB', fontSize: 11, fontWeight: '900', letterSpacing: 1.2 },
  score: { color: colors.white, fontSize: 42, fontWeight: '900', marginTop: 4 },
  scoreOutOf: { color: '#A9C9BB', fontSize: 18 },
  verifiedBadge: { backgroundColor: colors.mint, borderRadius: 99, paddingVertical: 7, paddingHorizontal: 10 },
  verifiedText: { color: colors.forest, fontSize: 10, fontWeight: '900' },
  scoreTrack: { height: 8, borderRadius: 99, backgroundColor: '#42584F', marginTop: 16, overflow: 'hidden' },
  scoreFill: { width: '94%', height: '100%', backgroundColor: '#76DBA5', borderRadius: 99 },
  scoreSummary: { color: '#D9E4DF', fontSize: 13, marginTop: 12 },
  stats: { flexDirection: 'row', marginVertical: 18, gap: 8 },
  stat: { flex: 1, backgroundColor: colors.white, borderRadius: 16, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.line },
  statValue: { color: colors.ink, fontSize: 17, fontWeight: '900' },
  statLabel: { color: colors.gray, fontSize: 11, marginTop: 3 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '900', marginBottom: 14 },
  stepRow: { flexDirection: 'row', minHeight: 112 },
  timeline: { width: 42, alignItems: 'center' },
  stepNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.forest, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { color: colors.white, fontSize: 14, fontWeight: '900' },
  timelineLine: { flex: 1, width: 3, backgroundColor: colors.line },
  stepCard: { flex: 1, backgroundColor: colors.white, borderRadius: 18, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: colors.line },
  stepTitle: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  stepDetail: { color: colors.gray, fontSize: 14, lineHeight: 20, marginTop: 4 },
  stepStatus: { color: colors.forest, fontSize: 12, fontWeight: '900', marginTop: 8 },
  liveBanner: { backgroundColor: colors.orangeSoft, borderLeftWidth: 5, borderLeftColor: colors.orange, borderRadius: 16, padding: 16, marginTop: 8 },
  liveTitle: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  liveText: { color: colors.gray, fontSize: 14, lineHeight: 20, marginTop: 4 },
  primaryAction: { marginTop: 18 },
  secondaryAction: { marginTop: 10 },
});
