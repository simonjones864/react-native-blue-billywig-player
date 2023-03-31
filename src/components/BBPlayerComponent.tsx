import React, { createRef } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  UIManager,
  Platform,
  requireNativeComponent,
  findNodeHandle,
} from 'react-native';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const propTypes: any = {
  ...ViewPropTypes,
  src: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
  paused: PropTypes.bool,
  muted: PropTypes.bool,
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

export class BBPlayer extends React.Component<PlayerProps> {
  playerRef = createRef<BBPlayer>();

  eventHandlers: any = {
    didTriggerPlaying: this.props.didTriggerPlaying,
    didTriggerPlay: this.props.didTriggerPlay,
    didTriggerPause: this.props.didTriggerPause,
    didTriggerEnded: this.props.didTriggerEnded,
    didTriggerSeeking: this.props.didTriggerSeeking,
    didTriggerSeeked: this.props.didTriggerSeeked,
    didTriggerAdLoaded: this.props.didTriggerAdLoaded,
    didTriggerAdStarted: this.props.didTriggerAdStarted,
    didTriggerAdFinished: this.props.didTriggerAdFinished,
    didTriggerAllAdsCompleted: this.props.didTriggerAllAdsCompleted,
    didRequestCollapse: this.props.didRequestCollapse,
    didRequestExpand: this.props.didRequestExpand,
  };

  constructor(props: PlayerProps) {
    super(props);
  }

  /**
   * Play the player
   */
  play = () => {
    const node = findNodeHandle(this.playerRef.current);
    const command = (UIManager as { [index: string]: any })[ComponentName]
      .Commands.play;
    const params: any[] = [];
    UIManager.dispatchViewManagerCommand(node, command, params);
  };

  /**
   * Pause the player
   */
  pause = () => {
    const node = findNodeHandle(this.playerRef.current);
    const command = (UIManager as { [index: string]: any })[ComponentName]
      .Commands.pause;
    const params: any[] = [];
    UIManager.dispatchViewManagerCommand(node, command, params);
  };

  /**
   * Mute the player
   */
  mute = () => {
    const node = findNodeHandle(this.playerRef.current);
    const command = (UIManager as { [index: string]: any })[ComponentName]
      .Commands.mute;
    const params: any[] = [];
    UIManager.dispatchViewManagerCommand(node, command, params);
  };

  /**
   * Unmute the player
   */
  unmute = () => {
    const node = findNodeHandle(this.playerRef.current);
    const command = (UIManager as { [index: string]: any })[ComponentName]
      .Commands.unmute;
    const params: any[] = [];
    UIManager.dispatchViewManagerCommand(node, command, params);
  };

  /**
   * Seek to a specific offset in seconds
   * @param offsetInSeconds number - The offset in seconds to seek to
   */
  seek = (offsetInSeconds: number) => {
    const node = findNodeHandle(this.playerRef.current);
    const command = (UIManager as { [index: string]: any })[ComponentName]
      .Commands.seek;
    const params: any[] = [offsetInSeconds];
    UIManager.dispatchViewManagerCommand(node, command, params);
  };

  componentDidMount() {
    const emitter = new NativeEventEmitter(NativeModules.EventEmitter);
    Object.keys(this.eventHandlers).forEach((eventName) => {
      this.eventHandlers[eventName] &&
        emitter.addListener(eventName, this.eventHandlers[eventName]);
    });
  }

  componentWillUnmount(): void {
    const emitter = new NativeEventEmitter(NativeModules.EventEmitter);
    Object.keys(this.eventHandlers).forEach((eventName) =>
      emitter.removeAllListeners(eventName)
    );
  }

  render = () => {
    return <PlayerView {...this.props} ref={this.playerRef} />;
  };
}

const ComponentName = 'BlueBillywigPlayerView';
const LINKING_ERROR =
  `The package 'react-native-blue-billywig-player' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const PlayerView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<PlayerProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
