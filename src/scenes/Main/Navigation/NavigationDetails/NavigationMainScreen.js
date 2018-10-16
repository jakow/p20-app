import React from 'react';
import { View , Text} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


// import NavigationInfo from './NavigationInfo';

export default class NavigationMainScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Navigation',
  };

  render() {
    const { navigation } = this.props;

    return (
      // <NavigationInfo />
      <View style={{alignItems: 'center'}}>
        <MapView style={{width: '100%', height: '100%'}}
           initialRegion={{
               latitude: 51.498796,
               longitude: -0.174884,
               latitudeDelta: 0.02,
               longitudeDelta: 0.02,
           }}>
         <MapView.Marker
             coordinate={{latitude: 51.498796,
             longitude: -0.174884,}}
             title={"Imperial College London"}
             description={"Location of summit"}
          />
          <MapView.Marker
              coordinate={{latitude: 51.488796,
              longitude: -0.184884,}}
              title={"Other Location"}
              description={"Location to show multiple pin for summit"}
           />
       </MapView>
      </View>
    );
  }
}
