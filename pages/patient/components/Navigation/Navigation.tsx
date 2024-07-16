import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FAQ from '../FAQ/FAQ';
import PersonalInformation from '../personalInformation/PersonalInformation';
import NavigationActions from './navigationActions/NavigationActions';
import React from 'react';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  const PatientTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: '#4cb5ed',
      card: 'white',
      primary: DefaultTheme.colors.primary,
      text: '#4287f5',
      notification: DefaultTheme.colors.notification,
      background: "#ccc"
    },
  };

  const ScreenNames = {
    personalInfo: "My DoubleSign",
    faq: "About"
  };
    
  return (
    <NavigationContainer>
      <Drawer.Navigator 
          drawerContent={(props) => 
            <NavigationActions drawerProps={props} showShareLink={true} />}
          initialRouteName={ScreenNames.personalInfo}>
        <Drawer.Screen name={ScreenNames.personalInfo} component={PersonalInformation} />
        <Drawer.Screen name={ScreenNames.faq} component={FAQ} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};