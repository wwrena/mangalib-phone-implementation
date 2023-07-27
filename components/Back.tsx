import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';

const Back = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{ position: 'absolute', top: 40, left: 20, zIndex: 999, flexDirection: 'row', alignItems: 'center', gap: 6 }}
            onPress={() => navigation.goBack()}
        >
            <Image style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: '#fff' }} source={require('../assets/app/chevron-left.png')} />
            <Text style={{ color: '#fff', height: 18 }}>Назад</Text>
        </TouchableOpacity>
    );
};

export default Back;
