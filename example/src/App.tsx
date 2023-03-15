import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { BBPlayer } from '../../src/index';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BBPlayer
        src={'https://demo.bbvms.com/p/native_sdk_inoutview/c/4256635.json'}
        style={styles.player}
      />
    </SafeAreaView>
  );
}

const playerDimensions = {
  width: Dimensions.get('screen').width,
  height: (Dimensions.get('screen').width * 9) / 16,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f7',
  },
  player: {
    width: playerDimensions.width,
    height: playerDimensions.height,
  },
  button: {
    padding: 6,
    marginBottom: 3,
    backgroundColor: '#111',
    color: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
});
