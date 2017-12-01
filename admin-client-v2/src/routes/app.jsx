import Dashboard from 'views/Dashboard/Dashboard';
import UserProfile from 'views/UserProfile/UserProfile';
import TableList from 'views/TableList/TableList';
import Typography from 'views/Typography/Typography';
import Icons from 'views/Icons/Icons';
import Maps from 'views/Maps/Maps';
import Notifications from 'views/Notifications/Notifications';
import Upgrade from 'views/Upgrade/Upgrade';
import SignIn from 'views/Auth/SignIn';

import DashboardKayak from 'views/Dashboard/DashboardKayak';
import DashboardLog from 'views/Dashboard/DashboardLog';

import CarList from 'views/Cars/CarList';
import CarBillingList from 'views/CarBillings/CarBillingList';
import UserList from 'views/Users/UserList';
import FlightList from 'views/Flights/FlightList';

const appRoutes = [
    { path: "/dashboardkayak", name: "Dashboard K", icon: "pe-7s-graph", component: DashboardKayak },
    { path: "/dashboardlog", name: "User Logs", icon: "pe-7s-id", component: DashboardLog },
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/user", name: "User Profile", icon: "pe-7s-user", component: UserProfile },
    { path: "/table", name: "Table List", icon: "pe-7s-note2", component: TableList },
    { path: "/typography", name: "Typography", icon: "pe-7s-news-paper", component: Typography },
    { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
    { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
    { path: "/notifications", name: "Notifications", icon: "pe-7s-bell", component: Notifications },
    { path: "/car", name: "Car Listing", icon: "pe-7s-car", component: CarList },
    { path: "/carBilling", name: "Car Billings", icon: "pe-7s-car", component: CarBillingList },
    { path: "/flight", name: "Flight Listing", icon: "pe-7s-car", component: FlightList },
    { path: "/signin", name: "Sign In", icon: "pe-7s-bell", component: SignIn },
    { path: "/userlist", name: "User Listing", icon: "pe-7s-car", component: UserList },
    // { upgrade: true, path: "/upgrade", name: "Upgrade to PRO", icon: "pe-7s-rocket", component: Upgrade },
    // { redirect: true, path:"/", to:"/dashboard", name: "Dashboard" }
];

export default appRoutes;
