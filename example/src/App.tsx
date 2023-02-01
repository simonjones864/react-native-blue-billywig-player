import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BBPlayer } from '../../src/index';

export default function App() {
  const [src, setSrc] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setSrc('https://bb.dev.bbvms.com/p/boyd_s_playout/c/1097100.json');
  }, []);

  const play = () => setIsPaused(false);
  const pause = () => setIsPaused(true);
  const mute = () => setIsMuted(true);
  const unmute = () => setIsMuted(false);

  const setVideo = () => {
    setSrc('https://bb.dev.bbvms.com/p/boyd_s_playout/c/1097100.json');
  };

  const setOutstream = () => {
    setSrc('https://demo.bbvms.com/a/native_sdk_outstream.json');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BBPlayer
        src={src}
        paused={isPaused}
        muted={isMuted}
        didTriggerPlay={() => console.log('PLAY')}
        didTriggerPause={() => console.log('PAUSE')}
        didTriggerEnded={() => console.log('ENDED')}
        style={styles.player}
      />
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => play()}>
          <Text style={styles.button}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pause()}>
          <Text style={styles.button}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => mute()}>
          <Text style={styles.button}>Mute</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => unmute()}>
          <Text style={styles.button}>Unmute</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVideo()}>
          <Text style={styles.button}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOutstream()}>
          <Text style={styles.button}>Outstream</Text>
        </TouchableOpacity>
      </View>
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
