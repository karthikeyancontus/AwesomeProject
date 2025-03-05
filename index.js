/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {mirrorflyInitialize} from './src/SDK/sdkUtils';
mirrorflyInitialize();

AppRegistry.registerComponent(appName, () => App);
