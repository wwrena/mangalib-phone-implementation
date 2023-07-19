import React from 'react';
import { View, Text } from 'react-native';

type Props = {
    children: any;
};

const MangaDetailsComponent: React.FC<Props> = ({ children }) => {
    return <View style={{ backgroundColor: '#141414', borderTopLeftRadius: 6, borderTopRightRadius: 6, marginTop: -20 }}>{children}</View>;
};

export default MangaDetailsComponent;
