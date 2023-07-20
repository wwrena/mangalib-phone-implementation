import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { AppTheme } from '../../styles/AppTheme';

type Props = {
    title: string;
    data: string | undefined | number;
};

const InfoChild: React.FC<Props> = ({ title, data }) => {
    return (
        <View>
            {data ? (
                <View style={{ paddingVertical: 4, display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ color: '#868E96', width: '38%' }}>{title}: </Text>
                    <Text style={{ ...AppTheme.textWhite }}>{data}</Text>
                </View>
            ) : null}
        </View>
    );
};

export default InfoChild;
