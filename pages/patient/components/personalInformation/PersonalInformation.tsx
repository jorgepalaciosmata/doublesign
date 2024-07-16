import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground,} from 'react-native';
import styles from './style';
import axios from 'axios';
import AuthService from '../../../shared/services/authService';
import { calculateDoubleSign } from './helper';
import { descriptions } from '../../../shared/descriptions';

const FormPatient: React.FC = () => { 

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
        console.log(_bday);
        setBday(_bday);
        
        let double = calculateDoubleSign(_bday);
        setWestern(double?.western);
        setChinese(double?.chinese);

        let uno = double?.chinese.toLowerCase() as keyof typeof descriptions;
        let dos = descriptions[uno];
        let desc = dos[double?.western?.toLowerCase() as keyof typeof dos];
        setDescription(desc);
    }
  };

  React.useEffect(() => { 
      getUserBirthday();
      let token = AuthService.getCurrentUserToken();
      setName(token.name);
  }, []);

  return (
    <ImageBackground source={require("../../../../assets/cielo.jpg")} >
      <View style={styles.container}>
        <View style={{ backgroundColor: "white", width: 400, padding: 50, marginLeft: 50, marginTop: 50 }}>
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
        </View>
      </View>
    </ImageBackground>)};

export default FormPatient;



