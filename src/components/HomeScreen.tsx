import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { colors, spacing } from '../theme';

type Props = {
  onPlanRoute: () => void;
  onReportBarrier: () => void;
};

export function HomeScreen({ onPlanRoute, onReportBarrier }: Props) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.brandRow}>
        <View style={styles.brandMark} accessible accessibilityLabel="Logotipo AcessoJá">
          <Text style={styles.brandMarkText}>A</Text>
        </View>
        <Text style={styles.brand}>AcessoJá</Text>
        <View style={styles.offlineBadge} accessible accessibilityLabel="Funciona sem internet">
          <Text style={styles.offlineText}>◉ funciona offline</Text>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>MOBILIDADE ACESSÍVEL</Text>
        <Text accessibilityRole="header" style={styles.title}>Sua cidade, sem barreiras.</Text>
        <Text style={styles.subtitle}>
          Descubra calçadas seguras, rampas e entradas acessíveis antes de sair de casa.
        </Text>
        <ActionButton
          label="Planejar rota acessível"
          accessibilityLabel="Planejar uma rota acessível"
          accessibilityHint="Abre a escolha de destino e perfil de mobilidade"
          onPress={onPlanRoute}
        />
        <ActionButton
          label="Relatar uma barreira"
          accessibilityLabel="Relatar uma barreira"
          accessibilityHint="Abre o formulário para avisar a comunidade sobre um obstáculo"
          onPress={onReportBarrier}
          variant="secondary"
          style={styles.secondaryAction}
        />
      </View>

      <View
        style={styles.statusCard}
        accessible
        accessibilityLabel="Comunidade hoje: 24 rotas verificadas e 3 barreiras resolvidas"
      >
        <Text style={styles.statusKicker}>COMUNIDADE HOJE</Text>
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Text style={styles.metricNumber}>24</Text>
            <Text style={styles.metricLabel}>rotas verificadas</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metric}>
            <Text style={styles.metricNumber}>3</Text>
            <Text style={styles.metricLabel}>barreiras resolvidas</Text>
          </View>
        </View>
      </View>

      <View style={styles.tipCard} accessible accessibilityLabel="Bateria fraca? Rotas salvas continuam disponíveis sem internet.">
        <Text style={styles.tipIcon} importantForAccessibility="no" accessibilityElementsHidden>
          ◎
        </Text>
        <View style={styles.tipCopy}>
          <Text style={styles.tipTitle}>Bateria fraca?</Text>
          <Text style={styles.tipText}>Rotas salvas continuam disponíveis sem internet.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.cream },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: spacing.lg, paddingTop: 56, paddingBottom: 48 },
  brandRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 36, gap: 10 },
  brandMark: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  brandMarkText: { color: colors.white, fontSize: 22, fontWeight: '900' },
  brand: { color: colors.ink, fontSize: 22, fontWeight: '900', flex: 1 },
  offlineBadge: { backgroundColor: colors.mint, borderRadius: 99, paddingVertical: 6, paddingHorizontal: 10 },
  offlineText: { color: colors.forest, fontSize: 13, fontWeight: '800' },
  hero: { marginBottom: 22 },
  eyebrow: { color: colors.orangeText, fontSize: 13, letterSpacing: 1.5, fontWeight: '900', marginBottom: 10 },
  title: { color: colors.ink, fontSize: 42, lineHeight: 46, fontWeight: '900', maxWidth: 500 },
  subtitle: { color: colors.gray, fontSize: 18, lineHeight: 27, marginTop: 14, marginBottom: 26, maxWidth: 540 },
  secondaryAction: { marginTop: 12 },
  statusCard: { backgroundColor: colors.ink, borderRadius: 24, padding: 22, marginTop: 8 },
  statusKicker: { color: '#9CDDBD', fontSize: 13, letterSpacing: 1.3, fontWeight: '900', marginBottom: 16 },
  metrics: { flexDirection: 'row', alignItems: 'center' },
  metric: { flexShrink: 1 },
  metricNumber: { color: colors.white, fontSize: 32, fontWeight: '900' },
  metricLabel: { color: '#D9E4DF', fontSize: 14, marginTop: 2 },
  divider: { width: 1, alignSelf: 'stretch', backgroundColor: '#486057', marginHorizontal: 28 },
  tipCard: { flexDirection: 'row', backgroundColor: colors.orangeSoft, borderRadius: 20, padding: 18, marginTop: 16, alignItems: 'center' },
  tipIcon: { fontSize: 32, color: colors.orangeText, marginRight: 14 },
  tipCopy: { flex: 1 },
  tipTitle: { color: colors.ink, fontSize: 16, fontWeight: '800' },
  tipText: { color: colors.gray, fontSize: 15, lineHeight: 21, marginTop: 3 },
});
