
# react-native-blue-billywig-player

React Native implementation of the Blue Billywig Native Player SDK for iOS + Android

## Installation

```sh
npm install react-native-blue-billywig-player
```

After installing the npm package, we need to install the pod.

```sh
$ (cd ios && pod install)
# --- or ---
$ npx pod-install
```

## Usage

```js
import { BBPlayer } from "react-native-blue-billywig-player";
```

## Rendering a Player with json source

```js
<BBPlayer
    style={{ width: 256, height: 144 }}
    src="https://demo.bbvms.com/p/native_sdk_inoutview/c/4256635.json"
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

GPL-3.0
