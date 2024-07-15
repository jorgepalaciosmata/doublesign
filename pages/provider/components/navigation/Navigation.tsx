import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import ProviderInformation from '../providerInformation/ProviderInformation';
import NavigationActions from '../../../patient/components/Navigation/navigationActions/NavigationActions';
import ProviderForms from '../forms/ProviderForms';

const Drawer = createDrawerNavigator();

const HCPromedicalDrawer = () => {
    return (
      <Drawer.Navigator 
        drawerContent={(props) => <NavigationActions  drawerProps={props} showShareLink={false} />}
      initialRouteName="Formularios">
        <Drawer.Screen name="Información personal" component={ProviderInformation} />
        <Drawer.Screen name="Formularios" component={ProviderForms} />
      </Drawer.Navigator>
    );
  }

export default function Navigation() {
  const DoctorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgb(255 204 204)',
      card: 'white',
      primary: DefaultTheme.colors.primary,
      // background: 'red',
      text: 'rgb(255 59 36)',
      notification: DefaultTheme.colors.notification,
    },
  };

  return (
    <NavigationContainer theme={DoctorTheme}>
      <HCPromedicalDrawer />
    </NavigationContainer>
  );
};