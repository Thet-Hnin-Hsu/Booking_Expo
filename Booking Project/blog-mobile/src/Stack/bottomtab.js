import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../Posts/home.js';
import BookingList from '../Posts/bookinglist.js';
import Logout from '../Components/logout.js';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

function MyBottomTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon:({color, size}) => (<MaterialCommunityIcons name="home" color={color} size={size} />),}}  />
            <Tab.Screen name="Booking List" component={BookingList} options={{tabBarIcon:({color, size}) => (<MaterialCommunityIcons name="bars" color={color} size={size} />),}} />
            <Tab.Screen name="Logout" component={Logout} options={{tabBarIcon:({color, size}) => (<MaterialCommunityIcons name="info" color={color} size={size} />),}} />
        </Tab.Navigator>
    )
}

export default MyBottomTab;