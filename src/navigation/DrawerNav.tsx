import { createDrawerNavigator } from 'react-navigation-drawer';
import DashboardScreen from '../screens/DashboardScreen';
import NewPayment from '../screens/NewPayment';
import PaymentList from '../screens/PaymentList';
import Profile from '../screens/Profile';
import FriendScreen from '../screens/FriendScreen';
import SingleViewPart from '../screens/SingleViewPart';

const DrawerNav = createDrawerNavigator(
  {
    Home: { screen: DashboardScreen },
    NewPayment: { screen: NewPayment },
    PaymentList: { screen: PaymentList },
    참여자개별결제페이지: { screen: SingleViewPart }
    // Logout : <Button></Button>
  },
  { unmountInactiveRoutes: true }
);

export default DrawerNav;
