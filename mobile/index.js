import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './app/navigation/AppNavigator';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
