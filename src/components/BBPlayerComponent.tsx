import React from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  UIManager,
  Platform,
  requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const propTypes: any = {
  ...ViewPropTypes,
  src: PropTypes.string.isRequired,
  didTriggerPlaying: PropTypes.func,
  didTriggerPlay: PropTypes.func,
  didTriggerPause: PropTypes.func,
  didTriggerEnded: PropTypes.func,
  didTriggerSeeking: PropTypes.func,
  didTriggerSeeked: PropTypes.func,
  didTriggerAdLoaded: PropTypes.func,
  didTriggerAdStarted: PropTypes.func,
  didTriggerAdFinished: PropTypes.func,
  didTriggerAllAdsCompleted: PropTypes.func,
  didRequestCollapse: PropTypes.func,
  didRequestExpand: PropTypes.func,
};

type PlayerProps = PropTypes.InferProps<typeof propTypes>;

interface State {
  width: number;
  height: number;
}

export class BBPlayer extends React.Component<PlayerProps, State> {
  constructor(props: PlayerProps) {
    super(props);
    this.state = {
      width: this.props.style.width || 0,
      height: this.props.style.height || 0,
    };
  }
  componentDidMount() {
    const emitter = new NativeEventEmitter(NativeModules.EventEmitter);
    if (!emitter) {
      console.log('No emitter found');
      return;
    }
    emitter.addListener('didTriggerPlaying', () => {
      this.props.didTriggerPlaying();
    });

    emitter.addListener('didTriggerPlay', () => {
      this.props.didTriggerPlay();
    });

    emitter.addListener('didTriggerPause', () => {
      this.props.didTriggerPause();
    });

    emitter.addListener('didTriggerEnded', () => {
      this.props.didTriggerEnded();
    });

    emitter.addListener('didTriggerSeeking', () => {
      this.props.didTriggerSeeking();
    });

    emitter.addListener('didTriggerSeeked', () => {
      this.props.didTriggerSeeked();
    });

    emitter.addListener('didTriggerAdLoaded', () => {
      this.props.didTriggerAdLoaded();
    });

    emitter.addListener('didTriggerAdStarted', () => {
      this.props.didTriggerAdStarted();
      if (Platform.OS === 'ios') return;
      this.setState({ height: this.state.height - 1 });
      setTimeout(() => this.setState({ height: this.state.height + 1 }), 10);
    });

    emitter.addListener('didTriggerAdFinished', () => {
      this.props.didTriggerAdFinished();
    });

    emitter.addListener('didTriggerAllAdsCompleted', () => {
      this.props.didTriggerAllAdsCompleted();
    });

    emitter.addListener('didRequestCollapse', () =>
      this.props.didRequestCollapse()
    );

    emitter.addListener('didRequestExpand', () =>
      this.props.didRequestExpand()
    );
  }

  componentWillUnmount(): void {
    const emitter = new NativeEventEmitter(NativeModules.EventEmitter);
    [
      'didTriggerPlaying',
      'didTriggerPlay',
      'didTriggerPause',
      'didTriggerEnded',
      'didTriggerSeeking',
      'didTriggerSeeked',
      'didTriggerAdLoaded',
      'didTriggerAdStarted',
      'didTriggerAdFinished',
      'didTriggerAllAdsCompleted',
      'didRequestCollapse',
      'didRequestExpand',
    ].forEach((eventName) => emitter.removeAllListeners(eventName));
  }
  render = () => {
    return (
      <PlayerView
        {...this.props}
        style={{
          ...this.props.style,
          width: this.state.width,
          height: this.state.height,
        }}
      />
    );
  };
}

const LINKING_ERROR =
  `The package 'react-native-blue-billywig-player' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ComponentName = 'BlueBillywigPlayerView';
const PlayerView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<PlayerProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
