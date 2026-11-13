import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme';

type Props = {
  label: string;
  accessibilityLabel: string;
  accessibilityHint?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
};

export function ActionButton({
  label,
  accessibilityLabel,
  accessibilityHint,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: Props) {
  const secondary = variant === 'secondary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [
        styles.base,
        secondary ? styles.secondary : styles.primary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, secondary && styles.secondaryLabel, disabled && styles.disabledLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
  },
  primary: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.forest,
  },
  // Estado desabilitado não depende só de cor: borda tracejada + texto de apoio na tela.
  disabled: {
    backgroundColor: '#E4EAE7',
    borderColor: colors.lineStrong,
    borderStyle: 'dashed',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },
  label: {
    color: colors.white,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  secondaryLabel: {
    color: colors.forest,
  },
  disabledLabel: {
    color: colors.gray,
  },
});
