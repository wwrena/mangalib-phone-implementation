import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import SafeView from './childs/SafeView';

const Footer = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#090909' }}>
            <SafeView>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 30,
                        justifyContent: 'space-evenly',
                        paddingTop: 16,
                    }}
                >
                    <TouchableOpacity>
                        <Text style={{ color: '#ddd' }}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: '#ddd' }}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </SafeView>
        </SafeAreaView>
    );
};

export default Footer;
