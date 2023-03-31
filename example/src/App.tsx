import React from 'react';
import {
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BBPlayer } from '../../src/index';

export default function App() {
  const playerRef = React.createRef<BBPlayer>();
  return (
    <SafeAreaView style={styles.container}>
      <BBPlayer
        ref={playerRef}
        autoPlay={true}
        src={'https://demo.bbvms.com/p/react_native_playout/c/4256635.json'}
        style={styles.player}
      />
      <MyButton text="Play" onPress={() => playerRef.current?.play()} />
      <MyButton text="Pause" onPress={() => playerRef.current?.pause()} />
      <MyButton text="Mute" onPress={() => playerRef.current?.mute()} />
      <MyButton text="Unmute" onPress={() => playerRef.current?.unmute()} />
      <MyButton
        text="Seek to Start"
        onPress={() => playerRef.current?.seek(0)}
      />
      <MyButton
        text="Seek to 2 minutes"
        onPress={() => playerRef.current?.seek(120)}
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
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  player: {
    width: playerDimensions.width,
    height: playerDimensions.height,
  },
  button: {
    padding: 6,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    backgroundColor: '#282828',
  },
});

function MyButton({ text, onPress }: { text: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={{ color: 'white' }}>{text}</Text>
    </TouchableOpacity>
  );
}
