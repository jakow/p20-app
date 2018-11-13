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
               latitude: 51.50804935,
               longitude: -0.1605672,
               latitudeDelta: 0.07,
               longitudeDelta: 0.07,
           }}>
         <MapView.Marker
             coordinate={{latitude: 51.4984453,
             longitude: -0.1747805,}}
             title={"Imperial College London - City and Guilds building"}
             description={"Workshops - 23rd November"}
          />
          <MapView.Marker
              coordinate={{latitude: 51.5173027,
              longitude: -0.1887792,}}
              title={"Porchester Hall"}
              description={"EmpowerPL Ball - 24th November"}
           />

           <MapView.Marker
               coordinate={{latitude: 51.5059347,
               longitude: -0.1323546,}}
               title={"Royal Society"}
               description={"Conference Location - 24th November"}
            />
       </MapView>
      </View>
    );
  }
}
