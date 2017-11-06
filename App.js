// @flow

import React from 'react';
import { AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import Welcome from './src/scenes/Welcome/Welcome';
import createStore from './src/services/store';
import { restoreTicketsFromStorage } from './src/services/tickets/actions';
import Main from './src/scenes/Main/Main';
import getTheme from './src/theme/native-base-theme/components';
import commonColor from './src/theme/native-base-theme/variables/commonColor';

type AppState = {
  loaded: boolean;
}

function loadFonts() {
  return Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    'Source Sans Pro': require('./src/assets/SourceSansPro/SourceSansPro-Regular.ttf'),
    'Source Sans Pro Light': require('./src/assets/SourceSansPro/SourceSansPro-Light.ttf'),
    'Source Sans Pro SemiBold': require('./src/assets/SourceSansPro/SourceSansPro-SemiBold.ttf'),
  });
}

if (process.env.NODE_ENV === 'development') {
  AsyncStorage.multiRemove([
    'tickets',
    'agenda',
  ]);
}

export default class App extends React.Component<void, {}, AppState> {
  // eslint-disable-next-line
  store = {};
  state = {
    loaded: false,
  };

  componentWillMount() {
    this.store = createStore();
    Promise.all([
      loadFonts(),
      this.store.dispatch(restoreTicketsFromStorage()),
    ]).then(() => this.setState({ loaded: true }));
  }

  render() {
    return (
      <Provider store={this.store}>
        <StyleProvider style={getTheme(commonColor)}>
          { this.state.loaded ? <Main /> : <Welcome /> }
        </StyleProvider>
      </Provider>);
  }
}
