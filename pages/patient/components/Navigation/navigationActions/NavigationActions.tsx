import AuthService from "../../../../shared/services/authService";
import React from "react";
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer";

export type navActionProps = {
  drawerProps: DrawerContentComponentProps,
  showShareLink: boolean
}

export default function NavigationActions(props: navActionProps) {
    return (
      <>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props.drawerProps} />
          <DrawerItem label="Logout" onPress={() => AuthService.logOut()} />
        </DrawerContentScrollView>
      </>
    );
  }
  