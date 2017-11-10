// @flow

import React from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
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

function preloadAssets() {
  return Promise.all([
    require('./src/components/assets/back-icon.png'),
    require('./src/components/assets/nav-arrow.png'),
    require('./src/components/assets/spinner.png'),
    require('./src/scenes/Main/Agenda/assets/list.png'),
    require('./src/scenes/Main/Agenda/assets/location.png'),
    require('./src/scenes/Main/Agenda/assets/arrow-down.png'),
    require('./src/scenes/Main/Agenda/assets/chevron-right.png'),
    require('./src/scenes/Main/People/assets/people.png'),
    require('./src/scenes/Main/Ticket/assets/reticle.png'),
    require('./src/scenes/Main/Ticket/assets/ticket.png'),
  ].map(image => Asset.fromModule(image).downloadAsync()));
}

function loadFonts() {
  return Font.loadAsync({
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
  }

  preload = async () => {
    await Promise.all([
      loadFonts(),
      preloadAssets(),
      this.store.dispatch(restoreTicketsFromStorage()),
    ]);
  }

  render() {
    if (!this.state.loaded) {
      return (
        <AppLoading
          startAsync={() => this.preload()}
          onFinish={() => this.setState({ loaded: true })}
        />
      );
    }

    return (
      <Provider store={this.store}>
        <StyleProvider style={getTheme(commonColor)}>
          <Main />
        </StyleProvider>
      </Provider>);
  }
}
