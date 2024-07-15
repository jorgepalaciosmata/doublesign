import AuthService from "../../../../shared/services/authService";
import QRCode from 'react-native-qrcode-svg';
import React, { useState } from "react";
import { ApiService } from "../../../../shared/services/apiService";
import { AxiosResponse } from "axios";
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer";
import { Modal, View, Text } from "react-native";
import { style } from "./style";

export type navActionProps = {
  drawerProps: DrawerContentComponentProps,
  showShareLink: boolean
}

export default function NavigationActions(props: navActionProps) {
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const [shareLink, setShareLink] = useState("");

    async function openShareDialog() {
      const response = await ApiService.create.get( '/getsharelink')
        .catch(function (error) {
          console.log(error);
        });

      const link = `${window.location.protocol}//${window.location.hostname}:
        ${window.location.port}?sharekey=${(response as AxiosResponse).data }`;
      
      setShareLink(link);
      setShareModalVisible(true);
    }

    return (
      <>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props.drawerProps} />
          { props.showShareLink ?? 
            <DrawerItem label="Compartir historial" onPress={() => 
              {openShareDialog(); props.drawerProps.navigation.closeDrawer()}} /> 
          }
          <DrawerItem label="Cerrar sesión" onPress={() => AuthService.logOut()} />
        </DrawerContentScrollView>
        
        <Modal
            animationType="slide"
            transparent={true}
            visible={shareModalVisible}>
            <View style={style.centeredView}>
                <View style={style.modalView}>
                    <Text style={[style.modalText]} >Compartir historial</Text>
                    <Text style={style.instructionsLabel}>
                    Tu profesional de la salud puede escanear este código QR con su 
                    dispositivo móvil para acceder a tu historial. 
                    </Text>
                    <QRCode value={shareLink} />

                    <div style={style.buttonsContainer}>
                        <Text style={style.cancelButton} onPress={() => 
                            setShareModalVisible(false)}>Cerrar</Text>
                    </div>
                </View>
            </View>
        </Modal>
      </>
    );
  }
  