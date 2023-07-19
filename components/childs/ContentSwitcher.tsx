import React from 'react';
import { View } from 'react-native';

type Props = {
    children: any;
};

const ContentSwitcher: React.FC<Props> = ({ children }) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                borderBottomColor: '#363638',
                borderBottomWidth: 1,
                marginTop: 13,
            }}
        >
            {children}
        </View>
    );
};

export default ContentSwitcher;
