import React from 'react';
import { View, Text } from 'react-native';

interface Props {
    children?: any;
}

const Heading: React.FC<Props> = ({ children }) => {
    return (
        <View>
            <Text style={{ color: 'white', fontWeight: '600', marginVertical: 12, fontSize: 16 }}>{children}</Text>
        </View>
    );
};

export default Heading;
