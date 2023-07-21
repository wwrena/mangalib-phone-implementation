import React from 'react';
import { View, Text } from 'react-native';

type Props = {
    children: string;
    current: string;
    desired: string;
};

const SearchSwitcher: React.FC<Props> = ({ children, current, desired }) => {
    return (
        <View
            style={{
                backgroundColor: current.toLowerCase() == desired.toLowerCase() ? '#ffa332' : '#36373d',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 3,
            }}
        >
            <Text style={{ color: '#ddd' }}>{children}</Text>
        </View>
    );
};

export default SearchSwitcher;
