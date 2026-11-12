import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { colors, spacing } from '../theme';

export type MobilityProfile = 'wheelchair' | 'walking' | 'low-vision';

type Props = { onRouteReady: (profile: MobilityProfile) => void };

const profiles: { id: MobilityProfile; label: string; hint: string; symbol: string }[] = [
  { id: 'wheelchair', label: 'Wheelchair', hint: 'Ramps and level surfaces', symbol: '◉' },
  { id: 'walking', label: 'Reduced mobility', hint: 'Benches and fewer stairs', symbol: '⌁' },
  { id: 'low-vision', label: 'Low vision', hint: 'Tactile paths and crossings', symbol: '◐' },
];

export function RoutePlannerScreen({ onRouteReady }: Props) {
  const [profile, setProfile] = useState<MobilityProfile>('walking');

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>PLAN YOUR ROUTE</Text>
      <Text accessibilityRole="header" style={styles.title}>Where do you need to go?</Text>

      <View style={styles.locationCard} accessible accessibilityLabel="Starting point: your current location, Praça da Independência">
        <View style={styles.locationDot} />
        <View style={styles.locationCopy}>
          <Text style={styles.locationLabel}>STARTING POINT</Text>
          <Text style={styles.locationName}>Current location</Text>
          <Text style={styles.locationAddress}>Praça da Independência</Text>
        </View>
        <Text style={styles.locationStatus}>GPS ✓</Text>
      </View>

      <View style={styles.connector} />

      <View style={styles.destinationCard} accessible accessibilityLabel="Destination: Central Health Clinic, 1.1 kilometers away">
        <View style={styles.destinationPin}><Text style={styles.pinText}>+</Text></View>
        <View style={styles.locationCopy}>
          <Text style={styles.locationLabel}>DESTINATION</Text>
          <Text style={styles.locationName}>Central Health Clinic</Text>
          <Text style={styles.locationAddress}>Av. Ana Costa · 1.1 km</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>What should the route prioritize?</Text>
      <View accessibilityRole="radiogroup">
        {profiles.map((item) => {
          const selected = profile === item.id;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`Select ${item.id} profile`}
              onPress={() => setProfile(item.id)}
              style={({ pressed }) => [styles.profile, selected && styles.profileSelected, pressed && styles.pressed]}
            >
              <View style={[styles.profileIcon, selected && styles.profileIconSelected]}>
                <Text style={[styles.profileSymbol, selected && styles.profileSymbolSelected]} accessibilityElementsHidden>{item.symbol}</Text>
              </View>
              <View style={styles.profileCopy}>
                <Text style={styles.profileLabel}>{item.label}</Text>
                <Text style={styles.profileHint}>{item.hint}</Text>
              </View>
              <Text style={styles.radioText}>{selected ? 'Selected ✓' : 'Choose'}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.offlineNote}>
        <Text style={styles.offlineTitle}>Offline-ready route</Text>
        <Text style={styles.offlineText}>The result will be saved automatically for use with weak or no signal.</Text>
      </View>

      <ActionButton
        label="Find safest route"
        accessibilityLabel="Plan route to Central Health Clinic"
        onPress={() => onRouteReady(profile)}
        style={styles.cta}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.cream },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: spacing.lg, paddingTop: 34, paddingBottom: 48 },
  eyebrow: { color: colors.orange, fontSize: 12, fontWeight: '900', letterSpacing: 1.4 },
  title: { color: colors.ink, fontSize: 34, lineHeight: 40, fontWeight: '900', marginTop: 8, marginBottom: 24 },
  locationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderWidth: 2, borderColor: colors.line, borderRadius: 20, padding: 18 },
  destinationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mint, borderWidth: 2, borderColor: colors.forest, borderRadius: 20, padding: 18 },
  locationDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.green, borderWidth: 5, borderColor: '#BEEAD3', marginRight: 14 },
  destinationPin: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  pinText: { color: colors.white, fontSize: 22, fontWeight: '900' },
  locationCopy: { flex: 1 },
  locationLabel: { color: colors.gray, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  locationName: { color: colors.ink, fontSize: 17, fontWeight: '900', marginTop: 4 },
  locationAddress: { color: colors.gray, fontSize: 14, marginTop: 2 },
  locationStatus: { color: colors.forest, fontSize: 12, fontWeight: '900' },
  connector: { width: 3, height: 18, backgroundColor: colors.line, marginLeft: 34 },
  sectionTitle: { color: colors.ink, fontSize: 19, fontWeight: '900', marginTop: 28, marginBottom: 12 },
  profile: { flexDirection: 'row', alignItems: 'center', minHeight: 76, backgroundColor: colors.white, borderWidth: 2, borderColor: colors.line, borderRadius: 18, padding: 12, marginBottom: 10 },
  profileSelected: { borderColor: colors.forest, backgroundColor: colors.mint },
  pressed: { opacity: 0.78 },
  profileIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: colors.orangeSoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  profileIconSelected: { backgroundColor: colors.forest },
  profileSymbol: { color: colors.orange, fontSize: 22, fontWeight: '900' },
  profileSymbolSelected: { color: colors.white },
  profileCopy: { flex: 1 },
  profileLabel: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  profileHint: { color: colors.gray, fontSize: 13, marginTop: 3 },
  radioText: { color: colors.forest, fontSize: 11, fontWeight: '900' },
  offlineNote: { backgroundColor: colors.orangeSoft, borderRadius: 18, padding: 16, marginTop: 12 },
  offlineTitle: { color: colors.ink, fontSize: 15, fontWeight: '900' },
  offlineText: { color: colors.gray, fontSize: 13, lineHeight: 19, marginTop: 4 },
  cta: { marginTop: 20 },
});
