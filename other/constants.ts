import { Dimensions } from 'react-native';

export const isTablet = () => {
    const deviceWidth = Dimensions.get('window').width;
    if (deviceWidth >= 1000) {
        return true;
    } else {
        return false;
    }
};
