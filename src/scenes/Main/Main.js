import { TabNavigator } from 'react-navigation';
import HomeScreen from './Home/HomeScreen';
import AgendaScreen from './Agenda/AgendaScreen';
import PeopleScreen from './People/PeopleScreen';
import TicketScreen from './Ticket/TicketScreen';
import { primaryColor } from '../../theme/colors';
import { tabBarLabel } from './style';

export default TabNavigator({
  Home: {
    screen: HomeScreen
  },
  Agenda: {
    screen: AgendaScreen,
  },
  People: {
    screen: PeopleScreen,
  },
  Ticket: {
    screen: TicketScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: primaryColor,
    labelStyle: tabBarLabel,
    style: {
      backgroundColor: 'white',
    },
  },
});
