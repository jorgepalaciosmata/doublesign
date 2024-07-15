import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import NoteCard from './note/noteCard';
import doctor from './doctor.svg';
import { IUserType } from '../../../shared/interfaces/IUserInfo';

export enum CardType {
    Note,
    Document,
    RequestToLink,
    VisitReminder
}

export default function EventCard(props: {type: CardType}) {

    const getTypeTitle = () => {
        switch(props.type) {
            case CardType.Document:
                return "Nuevo documento";
            case CardType.RequestToLink:
                return "Solicitud de acceso";
            case CardType.VisitReminder:
                return "Recordatorio de cita";
            case CardType.Note: 
            default:
                return 'Nota';
        }
    };

    const [accepted, setAccepted] = React.useState(false);


    return (
    <View style={style.mainContainer}>
        <div style={style.headerContainer}>
            <div style={style.providerPicture}>
                <img style={style.img} 
                    src='https://lh3.googleusercontent.com/a/ACg8ocJEfzpCYzcirqJTrzd_ykYJrT2NJFkc97ZkXp9AcHAlWg=s288-c-no' />
            </div>
            <div style={style.title}>
                <div>
                    <Text style={{fontWeight: 'bold' }}>Dr. Moriarty </Text>
                </div>
                <Text style={style.specialty}>
                    Especialidad
                </Text>
                <div>
                    <Text style={{ fontSize: 12, color: "#717171"}}>
                        {getTypeTitle()}    
                    </Text> 
                </div>
            </div>
        </div>
        <div style={ { height: '100%', padding: '10px', marginTop: '10px'  } }>
            <div style={{alignItems: 'center', 
                textAlign: 'center', 
                height: "100%",
                width: "100%"}}>
                
                {props.type === CardType.Note ? 
                    <NoteCard text='Lorem ipsum dolor sit amet, consectetur adipiscing 
                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.' /> : <></>}

                {props.type === CardType.RequestToLink ? 
                    <div>
                        <img src={doctor} style={{ width: '45px' }} />
                        <div style={{ marginTop: '20px'}}>
                            <NoteCard text='El Dr. Moriarty ha solicitado acceso a tu expediente.' /> 
                        </div>

                        { !accepted ? 
                        <div style={{ marginTop: '20px', display: 'flex'}}>
                            <Pressable  style={[style.button, style.buttonDisambiguation]} >
                                <Text style={style.submitButtonText}
                                    onPress={() => {
                                        setAccepted(true);
                                    }}>Aceptar</Text>
                            </Pressable>

                            <Pressable  style={[style.button, style.buttonDisambiguation]} >
                                <Text style={style.submitButtonText}>Rechazar</Text>
                            </Pressable>
                        </div> : 


                        <div style={{ marginTop: '20px', textAlign: 'left'}}>
                            <Text>Accesso otorgado en 15/03/2024 - 9:24 am.</Text>
                            <br />
                            <Text style={{color: "#717171"}}>Para configurar acceso a proveedores de servicios de salud en tu cuenta has click aquí.</Text>
                        </div>
                        }

                    </div> : <></>}
            </div>

        </div>
        <div style={{textAlign: 'right', marginTop: '30px', marginRight: '10px', color: "#717171"}}>
            <Text style={{fontSize: 10, color: "#717171"}}>Enero 19. 2024 - 2:00 pm.</Text>
        </div>
    </View>);
};


export const style = StyleSheet.create({    
    mainContainer: {
        borderColor: "#8ecce0",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        width: 500,
        padding: 25,
        shadowColor: "#8ecce0",
        shadowRadius: 10
    },
    headerContainer: {
        display: "flex",
        height: 60
    },
    providerPicture: {
        width: 70,
        borderColor: "black",
        borderWidth: 2
    },
    title: {
        width: "80%",
        fontWeight: "bold",
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 5
    },
    img: {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        borderRadius: 50
    },
    specialty: {
        fontSize: 12
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    buttonDisambiguation: {
        margin: 20,
        maxHeight: 38,
        width: 180
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});