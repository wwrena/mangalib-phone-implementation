import React from 'react';
import { View, Text } from 'react-native';

type Props = {
    scrollIndex: number;
    pages: number;
    counterShouldDisplay: Boolean;
};

const ScrollIndicator: React.FC<Props> = ({ scrollIndex, pages, counterShouldDisplay }) => {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#111111c4',
                left: 15,
                bottom: 70,
                zIndex: 99,
                borderRadius: 20,
                paddingVertical: 6,
                paddingHorizontal: 16,
                display: counterShouldDisplay ? 'flex' : 'none',
            }}
        >
            <Text style={{ color: 'white', fontWeight: '600' }}>
                {scrollIndex} / {pages}
            </Text>
        </View>
    );
};

export default ScrollIndicator;
