import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { colors, spacing } from '../theme';

type Props = {
  onPlanRoute: () => void;
  onReportBarrier: () => void;
};

export function HomeScreen({ onPlanRoute, onReportBarrier }: Props) {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      accessibilityRole="scrollbar"
    >
      <View style={styles.brandRow}>
        <View style={styles.brandMark} accessible accessibilityLabel="AcessoJá logo">
          <Text style={styles.brandMarkText}>A</Text>
        </View>
        <Text style={styles.brand}>AcessoJá</Text>
        <View style={styles.offlineBadge}>
          <Text style={styles.offlineText}>works offline</Text>
        </View>
      </View>

      <View style={styles.hero}>
        <Text accessibilityRole="header" style={styles.eyebrow}>ACCESSIBLE MOBILITY</Text>
        <Text accessibilityRole="header" style={styles.title}>Your city, without barriers.</Text>
        <Text style={styles.subtitle}>
          Find safer sidewalks, ramps and accessible entrances before leaving home.
        </Text>
        <ActionButton
          label="Plan accessible route"
          accessibilityLabel="Plan an accessible route"
          onPress={onPlanRoute}
        />
        <ActionButton
          label="Report a barrier"
          accessibilityLabel="Report a barrier"
          onPress={onReportBarrier}
          variant="secondary"
          style={styles.secondaryAction}
        />
      </View>

      <View style={styles.statusCard} accessible accessibilityLabel="Community status: 24 routes checked today and 3 barriers resolved">
        <Text style={styles.statusKicker}>COMMUNITY TODAY</Text>
        <View style={styles.metrics}>
          <View>
            <Text style={styles.metricNumber}>24</Text>
            <Text style={styles.metricLabel}>routes checked</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.metricNumber}>3</Text>
            <Text style={styles.metricLabel}>barriers resolved</Text>
          </View>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipIcon} accessibilityElementsHidden>◎</Text>
        <View style={styles.tipCopy}>
          <Text style={styles.tipTitle}>Low battery?</Text>
          <Text style={styles.tipText}>Saved routes remain available without internet.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.cream },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: spacing.lg, paddingTop: 56, paddingBottom: 48 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 36 },
  brandMark: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  brandMarkText: { color: colors.white, fontSize: 22, fontWeight: '900' },
  brand: { color: colors.ink, fontSize: 22, fontWeight: '900', flex: 1 },
  offlineBadge: { backgroundColor: colors.mint, borderRadius: 99, paddingVertical: 6, paddingHorizontal: 10 },
  offlineText: { color: colors.forest, fontSize: 12, fontWeight: '800' },
  hero: { marginBottom: 22 },
  eyebrow: { color: colors.orange, fontSize: 12, letterSpacing: 1.5, fontWeight: '900', marginBottom: 10 },
  title: { color: colors.ink, fontSize: 42, lineHeight: 46, fontWeight: '900', maxWidth: 500 },
  subtitle: { color: colors.gray, fontSize: 18, lineHeight: 27, marginTop: 14, marginBottom: 26, maxWidth: 540 },
  secondaryAction: { marginTop: 12 },
  statusCard: { backgroundColor: colors.ink, borderRadius: 24, padding: 22, marginTop: 8 },
  statusKicker: { color: '#9CDDBD', fontSize: 12, letterSpacing: 1.3, fontWeight: '900', marginBottom: 16 },
  metrics: { flexDirection: 'row', alignItems: 'center' },
  metricNumber: { color: colors.white, fontSize: 32, fontWeight: '900' },
  metricLabel: { color: '#D9E4DF', fontSize: 14, marginTop: 2 },
  divider: { width: 1, alignSelf: 'stretch', backgroundColor: '#486057', marginHorizontal: 28 },
  tipCard: { flexDirection: 'row', backgroundColor: colors.orangeSoft, borderRadius: 20, padding: 18, marginTop: 16, alignItems: 'center' },
  tipIcon: { fontSize: 32, color: colors.orange, marginRight: 14 },
  tipCopy: { flex: 1 },
  tipTitle: { color: colors.ink, fontSize: 16, fontWeight: '800' },
  tipText: { color: colors.gray, fontSize: 14, lineHeight: 20, marginTop: 3 },
});
