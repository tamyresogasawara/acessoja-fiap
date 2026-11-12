import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ActionButton } from './ActionButton';
import { colors, spacing } from '../theme';

const categories = [
  { id: 'sidewalk', label: 'Blocked sidewalk', symbol: '▰' },
  { id: 'ramp', label: 'Missing ramp', symbol: '↗' },
  { id: 'surface', label: 'Uneven surface', symbol: '≋' },
  { id: 'entrance', label: 'Inaccessible entrance', symbol: '▣' },
];

type Props = { onDone: () => void };

export function BarrierReportScreen({ onDone }: Props) {
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [saved, setSaved] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const confirmationOpacity = useRef(new Animated.Value(0)).current;
  const confirmationScale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) setReduceMotion(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  function submit() {
    if (!category || !details.trim()) return;
    setSaved(true);
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
        <Animated.View style={[styles.successCircle, { opacity: confirmationOpacity, transform: [{ scale: confirmationScale }] }]}>
          <Text style={styles.successSymbol} accessibilityElementsHidden>✓</Text>
        </Animated.View>
        <Text accessibilityRole="header" style={styles.successTitle}>Report saved!</Text>
        <Text style={styles.successText}>The community can now avoid this barrier.</Text>
        <Text style={styles.successMeta}>Recorded near your current location · available offline</Text>
        <ActionButton label="Return home" accessibilityLabel="Return to home" onPress={onDone} style={styles.doneButton} />
      </View>
    );
  }

  const formReady = Boolean(category && details.trim());

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.step}>STEP 1 OF 1</Text>
      <Text accessibilityRole="header" style={styles.title}>What is blocking the way?</Text>
      <Text style={styles.subtitle}>Choose one option and describe what you see. The report is saved even without internet.</Text>

      <View style={styles.grid} accessibilityRole="radiogroup">
        {categories.map((item) => {
          const selected = category === item.id;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`Select ${item.label.toLowerCase()}`}
              onPress={() => setCategory(item.id)}
              style={({ pressed }) => [styles.category, selected && styles.categorySelected, pressed && styles.pressed]}
            >
              <Text style={[styles.categorySymbol, selected && styles.categorySymbolSelected]} accessibilityElementsHidden>{item.symbol}</Text>
              <Text style={[styles.categoryLabel, selected && styles.categoryLabelSelected]}>{item.label}</Text>
              {selected && <Text style={styles.selectedText}>Selected ✓</Text>}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.fieldLabel}>Details</Text>
      <TextInput
        accessibilityLabel="Barrier details"
        placeholder="Example: construction blocks the full sidewalk"
        placeholderTextColor="#6B7772"
        multiline
        value={details}
        onChangeText={setDetails}
        maxLength={180}
        style={styles.input}
      />
      <Text style={styles.count}>{details.length}/180</Text>

      {!formReady && <Text style={styles.helper}>Select a barrier and add details to continue.</Text>}
      <ActionButton label="Save report" accessibilityLabel="Submit barrier report" onPress={submit} style={styles.submit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.cream },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: spacing.lg, paddingTop: 34, paddingBottom: 48 },
  step: { color: colors.orange, fontSize: 12, fontWeight: '900', letterSpacing: 1.4, marginBottom: 9 },
  title: { color: colors.ink, fontSize: 34, lineHeight: 40, fontWeight: '900' },
  subtitle: { color: colors.gray, fontSize: 16, lineHeight: 24, marginTop: 10, marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  category: { width: '46.7%', minHeight: 142, backgroundColor: colors.white, borderRadius: 20, borderWidth: 2, borderColor: colors.line, margin: 6, padding: 16, justifyContent: 'space-between' },
  categorySelected: { backgroundColor: colors.mint, borderColor: colors.forest },
  pressed: { opacity: 0.78 },
  categorySymbol: { color: colors.orange, fontSize: 28, fontWeight: '900' },
  categorySymbolSelected: { color: colors.forest },
  categoryLabel: { color: colors.ink, fontSize: 16, lineHeight: 21, fontWeight: '800', marginTop: 10 },
  categoryLabelSelected: { color: colors.forest },
  selectedText: { color: colors.forest, fontSize: 12, fontWeight: '900', marginTop: 8 },
  fieldLabel: { color: colors.ink, fontSize: 16, fontWeight: '800', marginTop: 24, marginBottom: 8 },
  input: { minHeight: 120, backgroundColor: colors.white, borderWidth: 2, borderColor: colors.line, borderRadius: 18, padding: 16, color: colors.ink, fontSize: 16, lineHeight: 23, textAlignVertical: 'top' },
  count: { color: colors.gray, fontSize: 12, textAlign: 'right', marginTop: 6 },
  helper: { color: colors.gray, fontSize: 13, marginTop: 12 },
  submit: { marginTop: 16 },
  successPage: { flex: 1, backgroundColor: colors.cream, padding: spacing.lg, alignItems: 'center', justifyContent: 'center' },
  successCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: colors.mint, borderWidth: 3, borderColor: colors.forest, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  successSymbol: { color: colors.forest, fontSize: 52, fontWeight: '900' },
  successTitle: { color: colors.ink, fontSize: 36, fontWeight: '900', textAlign: 'center' },
  successText: { color: colors.gray, fontSize: 18, lineHeight: 26, textAlign: 'center', marginTop: 10 },
  successMeta: { color: colors.forest, fontSize: 13, fontWeight: '700', textAlign: 'center', marginTop: 18 },
  doneButton: { alignSelf: 'stretch', marginTop: 30 },
});
