import React, { RefObject, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './style';
import axios from 'axios';
import AuthService from '../../../shared/services/authService';
import { calculateDoubleSign, calculateCompatibility } from './helper';
import { descriptions } from '../../../shared/descriptions';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

const LandingPage: React.FC = () => { 

  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

  const [bday, setBday] = React.useState<Date>();
  const [western, setWestern] = React.useState<string>();
  const [chinese, setChinese] = React.useState<string>();
  const [name, setName] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();

  const getUserBirthday = async () => {

    const client = axios.create({
        baseURL: "https://people.googleapis.com/v1/people",
        headers: {
            "Authorization": "Bearer " + AuthService.getCurrentAccessToken(),
            "Accept": "application/json"
        }
    });

    const response = await client.get("/109835145289295317480", {
        params: {
            personFields: 'birthdays',
            key: 'AIzaSyDKTfCbX3Itj6m6StUquQIC06cwIMJCvhI'
        }
    });

    if (response.data.birthdays) {
        const date = response.data.birthdays[0].date;
        const _bday = new Date(date.year, date.month - 1, date.day);
        setBday(_bday);
        
        let double = calculateDoubleSign(_bday);
        setWestern(double?.western);
        setChinese(double?.chinese);

        let chineseDescriptions = descriptions[double?.chinese.toLowerCase() as keyof typeof descriptions];
        setDescription(chineseDescriptions[double?.western?.toLowerCase() as keyof typeof chineseDescriptions]);
    }
  };

  React.useEffect(() => { 
      getUserBirthday();
      let token = AuthService.getCurrentUserToken();
      setName(token.name);
  }, []);

  const [secondaryDate, setSecondaryDate] = React.useState(undefined);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [compIndex, setCompIndex] = React.useState(0);

  const onDismissDatePicker = React.useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirmDatePicker = React.useCallback((response: any) => {
    setCompIndex(calculateCompatibility(bday!, response.date));
    setOpenDatePicker(false);
  }, [setOpenDatePicker, setSecondaryDate, bday]);

  return (
    <ImageBackground source={require("../../../../assets/cielo.jpg")} >
      <View style={styles.container}>
        <View style={{ backgroundColor: "white", maxWidth:400, minWidth: 300, padding: 50, marginTop: 50 }}>
          <View>
            <Text style={{textAlign:"right", fontWeight: "bold", fontSize: 18}}>{name}</Text>
          </View>
          <Text style={{textAlign:"right", marginBottom: 20}}>
            {bday?.toDateString()}
          </Text>
          <Text>
            <span style={{fontWeight:"bold"}}>Western Sign:</span> {western}</Text>
          <Text>
            <span style={{fontWeight:"bold"}}>Chinese Sign:</span> {chinese}</Text>
            <br />
          <Text>{description}</Text>   
          <br />
          <Text style={{ fontWeight: "bold" }}>Calculate Compatibility</Text>       
          <Text>Your compatibility index is: {compIndex} </Text>
          
          <SafeAreaProvider>
            <View style={{ marginTop: 20, justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <Button onPress={() => setOpenDatePicker(true)} uppercase={false} mode="outlined">
                Pick a date of birth
              </Button>
              <DatePickerModal
                presentationStyle="overFullScreen"
                saveLabel='Select'
                label='Select a date of birth to calculate compatibility'
                locale="en"
                mode="single"
                visible={openDatePicker}
                onDismiss={onDismissDatePicker}
                date={secondaryDate}
                onConfirm={onConfirmDatePicker}
              />
            </View>
          </SafeAreaProvider>
        </View>
      </View>
    </ImageBackground>)};

export default LandingPage;



