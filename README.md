# react-native-blue-billywig-player

**This package easily integrates the Blue Billywig Native Player SDK into your React Native application. This allows you to quickly add advanced video playback capabilities. It includes a set of components and methods for rendering and controlling the player, as well as event listeners for receiving updates on the player's state.**

[NPM Package](https://www.npmjs.com/package/@simonjones864/react-native-blue-billywig-player)

## Installation

Before proceeding with the following steps, please ensure that you have already created a React Native application.

```sh
npm i @simonjones864/react-native-blue-billywig-player --save
```

Following the installation of the npm package, it is necessary to install the pod in order to complete the process.

```sh
$ (cd ios && pod install)
# --- or ---
$ npx pod-install
```

## Usage

Importing the component from the module.

```js
import { BBPlayer } from '@simonjones864/react-native-blue-billywig-player';
```

## Rendering a Player

In order to render a player using a JSON source file, you can specify the URL of the JSON as the "src" attribute within the player component. The JSON URL that is used will depend on the playout and media you wish the player to play.

```js
<BBPlayer
  style={{ width: 256, height: 144 }}
  src="https://demo.bbvms.com/p/native_sdk_inoutview/c/4256635.json"
/>
```

## Attributes

These attributes can be utilized to set values and customize the behavior of the player.

| Attribute    | Description                                                                                                                                                        | type    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| **`src`**    | Sets the source URL for the media to be played by the player component.                                                                                            | string  |
| **`paused`** | Pause and resume the media playback by setting its value to either true or false.                                                                                  | boolean |
| **`muted`**  | Control the audio of the media by setting its value to either true or false. A value of true means the audio is muted, while a value of false means it's un-muted. | boolean |

## Callbacks

The callbacks for our player component enable you to determine what actions should be taken when specific events happen within the player.

### Example

```js
<BBPlayer
  style={{ width: 256, height: 144 }}
  src="https://demo.bbvms.com/p/native_sdk_inoutview/c/4256635.json"
  didTriggerPlay={(event) => {
    console.log('Play event was triggered!');
  }}
/>
```

### Available callbacks

The callbacks are wrapped in native events, but do not transmit any parameters.
Function | Description | Parameters
---|---|---
**`didTriggerPlaying`** | Player is playing. | None
**`didTriggerPlay`** | Player started playing. | None
**`didTriggerPause`** | Player paused playing. | None
**`didTriggerEnded`** | Player ended playing. | None
**`didTriggerSeeking`** | Player seeks. | None
**`didTriggerSeeked`** | Player seeked. | None
**`didRequestCollapse`** | Player triggers and collapse. | None
**`didRequestExpand`** | Player triggers an expand. | None
**`didTriggerAdLoaded`** | Player loaded an advertisement. | None
**`didTriggerAdStarted`** | Player started an advertisement. | None
**`didTriggerAdFinished`** | The advertisement finished playing. | None
**`didTriggerAllAdsCompleted`** | All advertisements finished playing. | None

## License

MPL-2.0
