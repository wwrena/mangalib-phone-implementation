import React from 'react';
import { View, Image } from 'react-native';

type Props = {
    url: string;
    avatar: string;
};

const Avatar: React.FC<Props> = ({ url, avatar }) => {
    return (
        <View>
            {avatar != '0' ? (
                <Image source={{ uri: url }} style={{ height: 50, width: 50, resizeMode: 'cover', marginRight: 15, borderRadius: 4 }} />
            ) : (
                <Image
                    source={{ uri: `https://cover.imglib.info/uploads/users/placeholder.png` }}
                    style={{ height: 50, width: 50, resizeMode: 'cover', marginRight: 15, borderRadius: 4 }}
                />
            )}
        </View>
    );
};

export default Avatar;
