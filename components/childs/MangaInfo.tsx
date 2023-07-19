import React from 'react';
import { View, Text } from 'react-native';

type Props = {
    children: any;
};

const MangaInfo: React.FC<Props> = ({ children }) => {
    return <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'center' }}>{children}</View>;
};

export default MangaInfo;
