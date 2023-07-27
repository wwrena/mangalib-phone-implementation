import React from 'react';
import { View } from 'react-native';

type Props = {
    children: any;
    isTablet: boolean;
    style?: any;
};

const ContentSwitcher: React.FC<Props> = ({ children, isTablet, style }) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: isTablet ? 'flex-start' : 'space-evenly',
                borderBottomColor: '#363638',
                borderBottomWidth: 1,
                marginTop: 13,
                ...style,
            }}
        >
            {children}
        </View>
    );
};

export default ContentSwitcher;
