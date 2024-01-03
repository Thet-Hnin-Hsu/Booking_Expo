import { createStackNavigator } from "@react-navigation/stack";
import Home from '../Posts/home.js';
import Detail from '../Posts/detail.js';
import Booking from '../Posts/booking.js';
import BookingDetail from '../Posts/bookingdetail.js';
import Login from '../Components/login.js';
import MyBottomTab from './bottomtab.js';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="detail" component={Detail} />
            <Stack.Screen name="booking" component={Booking} />
            <Stack.Screen name="bookingdetail" component={BookingDetail} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="home" component={MyBottomTab} />
        </Stack.Navigator>
    )
}

export default MyStack;