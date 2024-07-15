import {View, Text} from 'react-native';
import { style } from './style';

export default function Forms() {
    return (
        <View>
            <View style={style.mainContainer}>
                <View style={style.paragraph}>
                    <Text style={style.title}>In progress</Text>
                </View>
            </View>
        </View>
    );
};
