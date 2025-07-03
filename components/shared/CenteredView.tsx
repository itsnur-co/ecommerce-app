import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';

export default function CenteredView({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.centered, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
}); 