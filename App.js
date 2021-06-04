import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Game from './src/components/Game';

import { SafeAreaView, StyleSheet } from 'react-native';

export default function App() {
  return (
      <SafeAreaView style={ styles.container }>
        <StatusBar style="auto" />
        <Game></Game>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
