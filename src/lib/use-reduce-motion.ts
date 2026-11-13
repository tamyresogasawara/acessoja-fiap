import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Lê e acompanha a preferência "Reduzir movimento" do sistema.
 * Quando ativa, as animações do app são substituídas por mudanças instantâneas.
 */
export function useReduceMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

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

  return reduceMotion;
}
