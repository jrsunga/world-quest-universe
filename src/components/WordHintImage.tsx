import React, { useState } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { toTwemojiUrl } from '../utils/twemoji';

interface Props {
  emoji: string;
  size?: number;
}

/**
 * Renders a Twemoji CDN image for the given emoji character.
 * Falls back to the raw emoji text if the image fails to load.
 * Twemoji is open-source (MIT / CC-BY 4.0) — safe for commercial use.
 */
export function WordHintImage({ emoji, size = 100 }: Props) {
  const [failed, setFailed] = useState(false);
  const uri = toTwemojiUrl(emoji);

  if (failed) {
    return (
      <View style={[styles.fallback, { width: size, height: size }]}>
        <Text style={{ fontSize: size * 0.75 }}>{emoji}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size }}
      resizeMode="contain"
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
