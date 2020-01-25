import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


// import NavigationInfo from './NavigationInfo';

export class NavigationMainScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Locations',
  };

  generateMarkers() {

  }

  render() {
    const { navigation } = this.props;

    return (
      // <NavigationInfo />
      <View style={{ alignItems: 'center' }}>
        <MapView style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: 51.5061768,
            longitude: -0.1546971,
            latitudeDelta: 0.075,
            longitudeDelta: 0.075,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: 51.4984453,
              longitude: -0.1747805,
            }}
            title={"Imperial College London - City and Guilds building"}
            description={"Workshops - 25th October"}
          />
          <MapView.Marker
            coordinate={{
              latitude: 51.5158506,
              longitude: -0.1213541,
            }}
            title={"De Vere Grand Connaught Rooms"}
            description={"Poland 2.0 Summit Ball - 26th October"}
          />

          <MapView.Marker
            coordinate={{
              latitude: 51.5059347,
              longitude: -0.1323546,
            }}
            title={"Royal Society"}
            description={"Conference Location - 26th October"}
          />
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  agenda: state.agenda,
});

export default connect(mapStateToProps)(NavigationMainScreen);
