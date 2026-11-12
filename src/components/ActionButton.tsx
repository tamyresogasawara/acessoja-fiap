import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme';

type Props = {
  label: string;
  accessibilityLabel: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

export function ActionButton({
  label,
  accessibilityLabel,
  onPress,
  variant = 'primary',
  style,
}: Props) {
  const secondary = variant === 'secondary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        secondary ? styles.secondary : styles.primary,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, secondary && styles.secondaryLabel]}>{label}</Text>
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
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
  label: {
    color: colors.white,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800',
  },
  secondaryLabel: {
    color: colors.forest,
  },
});
