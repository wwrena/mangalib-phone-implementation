import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { AppTheme } from '../../styles/AppTheme';
import { ITitle } from '../../types/ITitle';
import SafeView from '../childs/SafeView';
import { ISlowDetails } from '../../types/ISlowDetails';
import InfoChild from './InfoChild';
import { ITeams } from '../../types/ITeams';
import Separator from '../Separator';
import { clearSpaces } from '../../utils/ClearSpaces';
import Related from './Related';
import Heading from '../Text/Heading';
import TeamCard from './TeamCard';
import Similar from './Similar';

type Props = {
    details: ITitle;
    slowDetails: ISlowDetails | null;
    genres: Object[] | null;
    teams: ITeams[] | null;
};

const MangaInformation: React.FC<Props> = ({ details, slowDetails, genres, teams }) => {
    const [descriptionStatus, setDescriptionStatus] = useState<string>('Подробнее...');
    const [descriptionNumberOfLines, setDescriptionNumberOfLines] = useState<number>(4);

    const changeStatus = () => {
        if (descriptionStatus == 'Подробнее...') {
            setDescriptionNumberOfLines(99999);
            setDescriptionStatus('свернуть');
        } else {
            setDescriptionNumberOfLines(4);
            setDescriptionStatus('Подробнее...');
        }
    };

    return (
        <View style={{ paddingBottom: 80 }}>
            <SafeView>
                <View style={{ paddingTop: 9 }}>
                    <InfoChild title='Статус тайтла' data={slowDetails?.manga_status} />
                    <InfoChild title='Статус перевода' data={slowDetails?.translation_status} />
                    <InfoChild title='Загружено глав' data={details?.chap_count} />
                    <InfoChild title='Формат выпуска' data={clearSpaces(slowDetails?.publish_type)} />
                    <InfoChild title='Автор' data={clearSpaces(slowDetails?.author)} />
                    <InfoChild title='Художник' data={clearSpaces(slowDetails?.artist)} />
                    <InfoChild title='Издатель' data={clearSpaces(slowDetails?.publisher)} />
                </View>
                <View style={{ paddingTop: 9 }}>
                    <Text style={{ ...AppTheme.textWhite }} numberOfLines={descriptionNumberOfLines}>
                        {details.summary}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            changeStatus();
                        }}
                    >
                        <Text style={{ color: 'orange' }}>{descriptionStatus}</Text>
                    </TouchableOpacity>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                        {genres ? (
                            genres.map((genre) => {
                                return (
                                    <TouchableOpacity
                                        key={genre.toString()}
                                        style={{ backgroundColor: '#76767f1f', borderColor: '#38383a', borderWidth: 1, borderRadius: 4 }}
                                    >
                                        <Text style={{ color: '#aaa', paddingVertical: 5, paddingHorizontal: 10, textTransform: 'capitalize' }}>
                                            {genre ? genre.toString() : null}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })
                        ) : (
                            <View style={{ width: '100%', display: 'flex', alignItems: 'center', height: '60%', marginVertical: '20%' }}>
                                <ActivityIndicator />
                                <Text style={{ color: '#ddd', fontWeight: '500', marginTop: 12 }}>Загружаем жанры...</Text>
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
                </View>
            </SafeView>
            <Related url={details.href} />
            <Similar url={details.href} />
        </View>
    );
};

export default MangaInformation;
