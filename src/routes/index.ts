import { lazy } from 'react';
const Upload = lazy(() => import('../pages/Micropensions/Upload'));
const PinUpload = lazy(() => import('../pages/Micropensions/PinUpload'));
const UserProfilePage = lazy(() => import('../pages/UserProfilePage'));
const MobileApp = lazy(() => import('../pages/Dashboard/MobileApp'));
const Mandate = lazy(() => import('../pages/Mandate/Mandate'));
const PinComponent = lazy(() => import('../pages/Mandate/PinComponent'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/mandate',
    title: 'Mandate',
    component: Mandate,
  },
  {
    path: '/mobile-app/:userId',
    component: UserProfilePage,
  },
  {
    path: '/mobile-app',
    component: MobileApp,
  },
  {
    path: '/micropensions/pin-upload/auth',
    component: PinUpload,
  },
  {
    path: '/micropensions/pin-upload/save',
    component: Upload,
  },
  // {
  //   path: '/pinData/:pin',
  //   component: PinData,
  // },
  {
    path: 'mandate/pinComponent/',
    component: PinComponent,
  },
  // {
  //   path: '/submitth',
  //   component: SubmitTh,
  // },
];

const routes = [...coreRoutes];
export default routes;
