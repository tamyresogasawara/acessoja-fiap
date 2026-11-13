import { useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { SelectionMark } from './SelectionMark';
import { colors, spacing } from '../theme';
import { useReduceMotion } from '../lib/use-reduce-motion';

const categories = [
  { id: 'sidewalk', label: 'Calçada bloqueada', symbol: '▰' },
  { id: 'ramp', label: 'Falta de rampa', symbol: '↗' },
  { id: 'surface', label: 'Piso irregular', symbol: '≋' },
  { id: 'entrance', label: 'Entrada inacessível', symbol: '▣' },
];

const MAX_DETAILS = 180;

type Props = { onDone: () => void };

export function BarrierReportScreen({ onDone }: Props) {
  const reduceMotion = useReduceMotion();
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [saved, setSaved] = useState(false);
  const confirmationOpacity = useRef(new Animated.Value(0)).current;
  const confirmationScale = useRef(new Animated.Value(0.96)).current;

  const formReady = Boolean(category && details.trim());

  function submit() {
    if (!formReady) return;
    setSaved(true);
    AccessibilityInfo.announceForAccessibility('Relato salvo. A comunidade já pode evitar esta barreira.');
    if (reduceMotion) {
      confirmationOpacity.setValue(1);
      confirmationScale.setValue(1);
      return;
    }
    Animated.parallel([
      Animated.timing(confirmationOpacity, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.spring(confirmationScale, { toValue: 1, damping: 14, stiffness: 150, useNativeDriver: true }),
    ]).start();
  }

  if (saved) {
    return (
      <View style={styles.successPage} accessibilityLiveRegion="polite">
        <Animated.View
          style={[styles.successCircle, { opacity: confirmationOpacity, transform: [{ scale: confirmationScale }] }]}
          importantForAccessibility="no-hide-descendants"
          accessibilityElementsHidden
        >
          <Text style={styles.successSymbol}>✓</Text>
        </Animated.View>
        <Text accessibilityRole="header" style={styles.successTitle}>Relato salvo!</Text>
        <Text style={styles.successText}>A comunidade já pode evitar esta barreira.</Text>
        <Text style={styles.successMeta}>Registrado perto da sua localização · disponível offline</Text>
        <ActionButton label="Voltar ao início" accessibilityLabel="Voltar à tela inicial" onPress={onDone} style={styles.doneButton} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.step}>RELATO RÁPIDO · 2 CAMPOS</Text>
      <Text accessibilityRole="header" style={styles.title}>O que está bloqueando o caminho?</Text>
      <Text style={styles.subtitle}>Escolha uma opção e descreva o que você vê. O relato é salvo mesmo sem internet.</Text>

      <View style={styles.grid} accessibilityRole="radiogroup" accessibilityLabel="Tipo de barreira">
        {categories.map((item) => {
          const selected = category === item.id;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected, selected }}
              accessibilityLabel={item.label}
              onPress={() => setCategory(item.id)}
              style={({ pressed }) => [styles.category, selected && styles.categorySelected, pressed && styles.pressed]}
            >
              <Text
                style={[styles.categorySymbol, selected && styles.categorySymbolSelected]}
                importantForAccessibility="no"
                accessibilityElementsHidden
              >
                {item.symbol}
              </Text>
              <Text style={[styles.categoryLabel, selected && styles.categoryLabelSelected]}>{item.label}</Text>
              <View style={styles.mark}><SelectionMark selected={selected} /></View>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.fieldLabel}>Detalhes</Text>
      <TextInput
        accessibilityLabel="Detalhes da barreira"
        accessibilityHint={`Até ${MAX_DETAILS} caracteres`}
        placeholder="Exemplo: obra bloqueando toda a calçada"
        placeholderTextColor="#5F6C67"
        multiline
        value={details}
        onChangeText={setDetails}
        maxLength={MAX_DETAILS}
        style={styles.input}
      />
      <Text style={styles.count} accessibilityLabel={`${details.length} de ${MAX_DETAILS} caracteres`}>
        {details.length}/{MAX_DETAILS}
      </Text>

      {!formReady && (
        <Text style={styles.helper} accessibilityLiveRegion="polite">
          ⓘ Escolha o tipo de barreira e escreva os detalhes para enviar.
        </Text>
      )}
      <ActionButton
        label="Enviar relato"
        accessibilityLabel="Enviar relato de barreira"
        accessibilityHint={formReady ? undefined : 'Escolha o tipo de barreira e escreva os detalhes primeiro'}
        onPress={submit}
        disabled={!formReady}
        style={styles.submit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.cream },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: spacing.lg, paddingTop: 34, paddingBottom: 48 },
  step: { color: colors.orangeText, fontSize: 13, fontWeight: '900', letterSpacing: 1.4, marginBottom: 9 },
  title: { color: colors.ink, fontSize: 34, lineHeight: 40, fontWeight: '900' },
  subtitle: { color: colors.gray, fontSize: 16, lineHeight: 24, marginTop: 10, marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  category: { width: '48.5%', minHeight: 150, backgroundColor: colors.white, borderRadius: 20, borderWidth: 2, borderColor: colors.lineStrong, padding: 16, justifyContent: 'space-between' },
  categorySelected: { backgroundColor: colors.mint, borderColor: colors.forest, borderWidth: 3 },
  pressed: { opacity: 0.82 },
  categorySymbol: { color: colors.orangeText, fontSize: 28, fontWeight: '900' },
  categorySymbolSelected: { color: colors.forest },
  categoryLabel: { color: colors.ink, fontSize: 16, lineHeight: 21, fontWeight: '800', marginTop: 10 },
  categoryLabelSelected: { color: colors.forest },
  mark: { marginTop: 8 },
  fieldLabel: { color: colors.ink, fontSize: 16, fontWeight: '800', marginTop: 24, marginBottom: 8 },
  input: { minHeight: 120, backgroundColor: colors.white, borderWidth: 2, borderColor: colors.lineStrong, borderRadius: 18, padding: 16, color: colors.ink, fontSize: 16, lineHeight: 23, textAlignVertical: 'top' },
  count: { color: colors.gray, fontSize: 13, textAlign: 'right', marginTop: 6 },
  helper: { color: colors.gray, fontSize: 14, lineHeight: 20, marginTop: 12 },
  submit: { marginTop: 16 },
  successPage: { flex: 1, backgroundColor: colors.cream, padding: spacing.lg, alignItems: 'center', justifyContent: 'center' },
  successCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: colors.mint, borderWidth: 3, borderColor: colors.forest, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  successSymbol: { color: colors.forest, fontSize: 52, fontWeight: '900' },
  successTitle: { color: colors.ink, fontSize: 36, fontWeight: '900', textAlign: 'center' },
  successText: { color: colors.gray, fontSize: 18, lineHeight: 26, textAlign: 'center', marginTop: 10 },
  successMeta: { color: colors.forest, fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: 18 },
  doneButton: { alignSelf: 'stretch', marginTop: 30, maxWidth: 520, width: '100%' },
});
