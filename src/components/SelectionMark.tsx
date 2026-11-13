import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';
import { useReduceMotion } from '../lib/use-reduce-motion';

type Props = { selected: boolean };

/**
 * Indicador de seleção redundante (texto + símbolo + cor).
 * Microinteração: o selo "Selecionado ✓" surge com uma leve mola,
 * confirmando o toque. Com movimento reduzido, aparece sem animação.
 */
export function SelectionMark({ selected }: Props) {
  const reduceMotion = useReduceMotion();
  const scale = useRef(new Animated.Value(selected ? 1 : 0.6)).current;

  useEffect(() => {
    if (!selected) return;
    if (reduceMotion) {
      scale.setValue(1);
      return;
    }
    scale.setValue(0.6);
    Animated.spring(scale, { toValue: 1, damping: 12, stiffness: 220, useNativeDriver: true }).start();
  }, [selected, reduceMotion, scale]);

  if (!selected) {
    return <Text style={styles.choose}>Escolher</Text>;
  }

  return (
    <Animated.View style={[styles.badge, { transform: [{ scale }] }]}>
      <Text style={styles.badgeText}>Selecionado ✓</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  choose: { color: colors.gray, fontSize: 13, fontWeight: '800' },
  badge: { backgroundColor: colors.forest, borderRadius: 99, paddingVertical: 5, paddingHorizontal: 9, alignSelf: 'flex-start' },
  badgeText: { color: colors.white, fontSize: 13, fontWeight: '900' },
});
