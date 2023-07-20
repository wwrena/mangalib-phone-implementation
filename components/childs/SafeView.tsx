import React from 'react';
import { View, ViewStyle } from 'react-native';

type Props = {
    children?: any;
    style?: ViewStyle;
};

const SafeView: React.FC<Props> = ({ children, style }) => {
    return (
        <View
            style={{
                marginHorizontal: 12,
                ...style,
            }}
        >
            {children}
        </View>
    );
};

export default SafeView;
