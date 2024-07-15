import React from 'react';
import { View, Image } from 'react-native';

const WarningCom = () => {
  return (
    <View>
      <Image
        source={require('../../../../assets/warning-icon.svg')}
        style={{ width: 13, height: 13 }}
      />
    </View>
  );
};

export default WarningCom;