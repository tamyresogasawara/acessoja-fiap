import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { SelectionMark } from './SelectionMark';
import { colors, spacing } from '../theme';
import { destination, type MobilityProfile } from '../lib/route-data';

export type { MobilityProfile } from '../lib/route-data';

type Props = { onRouteReady: (profile: MobilityProfile) => void };

const profiles: { id: MobilityProfile; label: string; hint: string; symbol: string }[] = [
  { id: 'wheelchair', label: 'Cadeira de rodas', hint: 'Rampas e piso nivelado', symbol: '◉' },
  { id: 'walking', label: 'Mobilidade reduzida', hint: 'Bancos e menos esforço', symbol: '⌁' },
  { id: 'low-vision', label: 'Baixa visão', hint: 'Piso tátil e sinal sonoro', symbol: '◐' },
];

export function RoutePlannerScreen({ onRouteReady }: Props) {
  const [profile, setProfile] = useState<MobilityProfile>('walking');

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>PLANEJE SUA ROTA</Text>
      <Text accessibilityRole="header" style={styles.title}>Para onde você precisa ir?</Text>

      <View style={styles.locationCard} accessible accessibilityLabel="Ponto de partida: sua localização atual, Praça da Independência. GPS ativo.">
        <View style={styles.locationDot} />
        <View style={styles.locationCopy}>
          <Text style={styles.locationLabel}>PARTIDA</Text>
          <Text style={styles.locationName}>Localização atual</Text>
          <Text style={styles.locationAddress}>Praça da Independência</Text>
        </View>
        <Text style={styles.locationStatus}>GPS ✓</Text>
      </View>

      <View style={styles.connector} />

      <View
        style={styles.destinationCard}
        accessible
        accessibilityLabel={`Destino: ${destination.name}, ${destination.address}, a ${destination.distanceKm.toString().replace('.', ',')} quilômetro`}
      >
        <View style={styles.destinationPin}><Text style={styles.pinText}>+</Text></View>
        <View style={styles.locationCopy}>
          <Text style={styles.locationLabel}>DESTINO</Text>
          <Text style={styles.locationName}>{destination.name}</Text>
          <Text style={styles.locationAddress}>
            {destination.address} · {destination.distanceKm.toString().replace('.', ',')} km
          </Text>
        </View>
      </View>

      <Text accessibilityRole="header" style={styles.sectionTitle}>O que a rota deve priorizar?</Text>
      <View accessibilityRole="radiogroup" accessibilityLabel="Perfil de mobilidade">
        {profiles.map((item) => {
          const selected = profile === item.id;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected, selected }}
              accessibilityLabel={`Perfil ${item.label.toLowerCase()}: ${item.hint.toLowerCase()}`}
              onPress={() => setProfile(item.id)}
              style={({ pressed }) => [styles.profile, selected && styles.profileSelected, pressed && styles.pressed]}
            >
              <View style={[styles.profileIcon, selected && styles.profileIconSelected]}>
                <Text
                  style={[styles.profileSymbol, selected && styles.profileSymbolSelected]}
                  importantForAccessibility="no"
                  accessibilityElementsHidden
                >
                  {item.symbol}
                </Text>
              </View>
              <View style={styles.profileCopy}>
                <Text style={styles.profileLabel}>{item.label}</Text>
                <Text style={styles.profileHint}>{item.hint}</Text>
              </View>
              <SelectionMark selected={selected} />
            </Pressable>
          );
        })}
      </View>

      <View style={styles.offlineNote}>
        <Text style={styles.offlineTitle}>Pronta para sinal fraco</Text>
        <Text style={styles.offlineText}>Na próxima tela, você pode salvar a rota para usar sem internet.</Text>
      </View>

      <ActionButton
        label="Encontrar rota mais segura"
        accessibilityLabel={`Encontrar rota mais segura até ${destination.name}`}
        onPress={() => onRouteReady(profile)}
        style={styles.cta}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.cream },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: spacing.lg, paddingTop: 34, paddingBottom: 48 },
  eyebrow: { color: colors.orangeText, fontSize: 13, fontWeight: '900', letterSpacing: 1.4 },
  title: { color: colors.ink, fontSize: 34, lineHeight: 40, fontWeight: '900', marginTop: 8, marginBottom: 24 },
  locationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderWidth: 2, borderColor: colors.line, borderRadius: 20, padding: 18 },
  destinationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mint, borderWidth: 2, borderColor: colors.forest, borderRadius: 20, padding: 18 },
  locationDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.green, borderWidth: 5, borderColor: '#BEEAD3', marginRight: 14 },
  destinationPin: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.orangeText, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  pinText: { color: colors.white, fontSize: 22, fontWeight: '900' },
  locationCopy: { flex: 1 },
  locationLabel: { color: colors.gray, fontSize: 12, fontWeight: '900', letterSpacing: 1.2 },
  locationName: { color: colors.ink, fontSize: 17, fontWeight: '900', marginTop: 4 },
  locationAddress: { color: colors.gray, fontSize: 14, marginTop: 2 },
  locationStatus: { color: colors.forest, fontSize: 13, fontWeight: '900' },
  connector: { width: 3, height: 18, backgroundColor: colors.line, marginLeft: 34 },
  sectionTitle: { color: colors.ink, fontSize: 19, fontWeight: '900', marginTop: 28, marginBottom: 12 },
  profile: { flexDirection: 'row', alignItems: 'center', minHeight: 76, backgroundColor: colors.white, borderWidth: 2, borderColor: colors.lineStrong, borderRadius: 18, padding: 12, marginBottom: 10, gap: 8 },
  profileSelected: { borderColor: colors.forest, borderWidth: 3, backgroundColor: colors.mint },
  pressed: { opacity: 0.82 },
  profileIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: colors.orangeSoft, alignItems: 'center', justifyContent: 'center', marginRight: 4 },
  profileIconSelected: { backgroundColor: colors.forest },
  profileSymbol: { color: colors.orangeText, fontSize: 22, fontWeight: '900' },
  profileSymbolSelected: { color: colors.white },
  profileCopy: { flex: 1 },
  profileLabel: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  profileHint: { color: colors.gray, fontSize: 14, marginTop: 3 },
  offlineNote: { backgroundColor: colors.orangeSoft, borderRadius: 18, padding: 16, marginTop: 12 },
  offlineTitle: { color: colors.ink, fontSize: 15, fontWeight: '900' },
  offlineText: { color: colors.gray, fontSize: 14, lineHeight: 20, marginTop: 4 },
  cta: { marginTop: 20 },
});
