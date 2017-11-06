// @flow

import React from 'react';
import { Font } from 'expo';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import Welcome from './src/scenes/Welcome/Welcome';
import createStore from './src/services/store';
import Main from './src/scenes/Main/Main';
import getTheme from './src/theme/native-base-theme/components';
import commonColor from './src/theme/native-base-theme/variables/commonColor';

type AppState = {
  loaded: boolean;
}

export default class App extends React.Component<void, {}, AppState> {
  // eslint-disable-next-line
  store = {};
  state = {
    loaded: false,
  };

  componentWillMount() {
    this.store = createStore();
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      'Source Sans Pro': require('./src/assets/SourceSansPro/SourceSansPro-Regular.ttf'),
      'Source Sans Pro Light': require('./src/assets/SourceSansPro/SourceSansPro-Light.ttf'),
      'Source Sans Pro SemiBold': require('./src/assets/SourceSansPro/SourceSansPro-SemiBold.ttf'),
    }).then(() => {
      this.setState({ loaded: true });
    });
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
