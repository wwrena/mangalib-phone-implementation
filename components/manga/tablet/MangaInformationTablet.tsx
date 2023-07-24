import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ITitle } from '../../../types/ITitle';
import { ITeams } from '../../../types/ITeams';
import Heading from '../../Text/Heading';
import TeamCard from '../TeamCard';
import Related from '../Related';
import Similar from '../Similar';
import { isTablet } from '../../../other/constants';
import Listed from './Listed';
import Rated from './Rated';

type Props = {
    details: ITitle;
    genres: Object[] | null;
    teams: ITeams[] | null;
};

const MangaInformationTablet: React.FC<Props> = ({ details, genres, teams }) => {
    const [stats, setStats] = useState<any>(null);
    useEffect(() => {
        fetch(details.href).then((res: any) => {
            res.text().then((res: any) => {
                setStats(res);
            });
        });
    }, []);

    return (
        <View>
            <View style={{ marginTop: 12 }}>
                <Text style={{ color: 'white' }}>{details.summary}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                {genres ? (
                    genres.map((genre) => {
                        return (
                            <TouchableOpacity
                                key={genre.toString()}
                                style={{ backgroundColor: '#76767f1f', borderColor: '#38383a', borderWidth: 1, borderRadius: 4 }}
                            >
                                <Text
                                    style={{
                                        color: '#aaa',
                                        paddingVertical: 5,
                                        paddingHorizontal: 10,
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {genre ? genre.toString() : null}
                                </Text>
                            </TouchableOpacity>
                        );
                    })
                ) : (
                    <View style={{ width: '100%', display: 'flex', alignItems: 'center', height: '60%', marginVertical: '20%' }}>
                        <ActivityIndicator />
                        <Text style={{ color: '#ddd', fontWeight: '500', marginTop: 12 }}>Загружаем информацию...</Text>
                    </View>
                )}
            </View>
            {teams ? (
                <>
                    <Heading>Переводчики</Heading>
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {teams.map((team: ITeams) => {
                            return <TeamCard key={team.id} team={team} />;
                        })}
                    </View>
                </>
            ) : null}
            <Related isTablet={isTablet()} url={details.href} />
            <Similar isTablet={isTablet()} url={details.href} />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Listed isTablet={isTablet()} stats={stats} />
                <Rated isTablet={isTablet()} stats={stats} rate={details.rate_avg} />
            </View>
        </View>
    );
};

export default MangaInformationTablet;
