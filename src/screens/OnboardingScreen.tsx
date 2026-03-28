import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../theme/colors';
import { savePlayerSetup } from '../store/gameStore';
import { getWorldForAge } from '../data/worlds';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const AGE_OPTIONS = [4, 5, 6, 7, 8, 9, 10, 11, 12];

export function OnboardingScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [step, setStep] = useState<'name' | 'age'>('name');

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const nameValid = name.trim().length > 0;
  const canProceed = selectedAge !== null;

  const transitionToAge = () => {
    if (!nameValid) return;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -40, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      setStep('age');
      slideAnim.setValue(40);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleStart = async () => {
    if (!selectedAge) return;
    const world = getWorldForAge(selectedAge);
    await savePlayerSetup(selectedAge, name.trim() || 'Hero', world);
    navigation.replace('WorldSelect', { playerAge: selectedAge, playerName: name.trim() || 'Hero' });
  };

  return (
    <LinearGradient colors={[Colors.deepSpace, Colors.skyBlue]} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            {/* Stars background decoration */}
            <View style={styles.starsRow} pointerEvents="none">
              {['⭐', '✨', '🌟', '💫', '⭐', '✨'].map((s, i) => (
                <Text key={i} style={[styles.starDeco, { opacity: 0.3 + (i % 3) * 0.2, fontSize: 10 + (i % 3) * 4 }]}>
                  {s}
                </Text>
              ))}
            </View>

            {/* Logo */}
            <View style={styles.logoArea}>
              <Text style={styles.logoEmoji}>🌊</Text>
              <Text style={styles.logoTitle}>WordQuest</Text>
              <Text style={styles.logoSubtitle}>Universe</Text>
              <Text style={styles.tagline}>A reading adventure for young heroes</Text>
            </View>

            {/* Step content */}
            <Animated.View
              style={[
                styles.card,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              {step === 'name' ? (
                <>
                  <Text style={styles.stepEmoji}>👋</Text>
                  <Text style={styles.cardTitle}>What's your hero's name?</Text>
                  <Text style={styles.cardSubtitle}>You're about to save the universe from The Blank!</Text>

                  <TextInput
                    style={styles.nameInput}
                    placeholder="Enter your name..."
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={name}
                    onChangeText={setName}
                    maxLength={20}
                    autoFocus
                    onSubmitEditing={transitionToAge}
                    returnKeyType="next"
                  />

                  <TouchableOpacity
                    style={[styles.primaryBtn, !nameValid && styles.btnDisabled]}
                    onPress={transitionToAge}
                    disabled={!nameValid}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={nameValid ? [Colors.mint, '#2bb5ad'] : ['#333', '#333']}
                      style={styles.btnGradient}
                    >
                      <Text style={styles.btnText}>Let's go! →</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.stepEmoji}>🎂</Text>
                  <Text style={styles.cardTitle}>How old are you, {name || 'Hero'}?</Text>
                  <Text style={styles.cardSubtitle}>We'll pick the perfect adventure for you!</Text>

                  <View style={styles.ageGrid}>
                    {AGE_OPTIONS.map((age) => (
                      <TouchableOpacity
                        key={age}
                        style={[
                          styles.ageBubble,
                          selectedAge === age && styles.ageBubbleSelected,
                        ]}
                        onPress={() => setSelectedAge(age)}
                        activeOpacity={0.8}
                      >
                        <Text
                          style={[
                            styles.ageText,
                            selectedAge === age && styles.ageTextSelected,
                          ]}
                        >
                          {age}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {selectedAge && (
                    <View style={styles.ageTip}>
                      <Text style={styles.ageTipText}>
                        {selectedAge <= 7
                          ? '🌊 Perfect for the Sea of Words!'
                          : selectedAge <= 9
                          ? '🧙 You belong in the Spell Realm!'
                          : '🚀 Ready for Star Reader adventures!'}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={[styles.primaryBtn, !canProceed && styles.btnDisabled]}
                    onPress={handleStart}
                    disabled={!canProceed}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={canProceed ? [Colors.gold, Colors.orange] : ['#333', '#333']}
                      style={styles.btnGradient}
                    >
                      <Text style={[styles.btnText, canProceed && { color: Colors.deepSpace }]}>
                        Start My Quest! 🗺️
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setStep('name')} style={styles.backBtn}>
                    <Text style={styles.backText}>← Change name</Text>
                  </TouchableOpacity>
                </>
              )}
            </Animated.View>

            <Text style={styles.footer}>
              🛡️ No account needed · Safe for kids · Ad-free
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 12,
    marginBottom: -8,
  },
  starDeco: { color: Colors.gold },

  // Logo
  logoArea: { alignItems: 'center', marginTop: 20, marginBottom: 28 },
  logoEmoji: { fontSize: 64, marginBottom: 8 },
  logoTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: Colors.gold,
    letterSpacing: -1,
    lineHeight: 46,
  },
  logoSubtitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.lavender,
    letterSpacing: 4,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 13,
    color: Colors.dimWhite,
    fontWeight: '600',
  },

  // Card
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepEmoji: { fontSize: 48, marginBottom: 12 },
  cardTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    color: Colors.dimWhite,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  // Name input
  nameInput: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(195,166,255,0.4)',
    borderRadius: 14,
    padding: 16,
    fontSize: 18,
    color: Colors.white,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Age grid
  ageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  ageBubble: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageBubbleSelected: {
    backgroundColor: Colors.lavender,
    borderColor: Colors.lavender,
  },
  ageText: {
    color: Colors.softWhite,
    fontSize: 20,
    fontWeight: '800',
  },
  ageTextSelected: {
    color: Colors.deepSpace,
  },
  ageTip: {
    backgroundColor: 'rgba(78,205,196,0.12)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.25)',
  },
  ageTipText: {
    color: Colors.mint,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Buttons
  primaryBtn: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  btnDisabled: { opacity: 0.5 },
  btnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  backBtn: { paddingVertical: 8 },
  backText: {
    color: Colors.dimWhite,
    fontSize: 14,
    fontWeight: '600',
  },

  footer: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});
