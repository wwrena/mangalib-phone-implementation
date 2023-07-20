import React from 'react';
import { View, Image, Text } from 'react-native';
import { ITeams } from '../../types/ITeams';

interface Props {
    team: ITeams;
}

const TeamCard: React.FC<Props> = ({ team }) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                height: 30,
                alignItems: 'center',
                backgroundColor: '#252527',
                borderRadius: 4,
                overflow: 'hidden',
            }}
        >
            {team.cover ? (
                <Image
                    source={{ uri: `https://mangalib.me/uploads/team/${team.slug}/cover/${team.cover}_250x350.jpg` }}
                    style={{ height: 30, width: 20, resizeMode: 'cover' }}
                />
            ) : (
                <Image source={{ uri: `https://cover.imglib.info/uploads/no-image.png` }} style={{ height: 30, width: 20, resizeMode: 'cover' }} />
            )}
            <Text style={{ color: '#ddd', marginHorizontal: 8 }}>{team.name}</Text>
        </View>
    );
};

export default TeamCard;
