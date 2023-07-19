import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { AppTheme } from '../styles/AppTheme';
import { ITitle } from '../types/ITitle';
import SafeView from './childs/SafeView';
import { ISlowDetails } from '../types/ISlowDetails';
import InfoChild from './InfoChild';
import { ITeams } from '../types/ITeams';
import Separator from './Separator';

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

    useEffect(() => {
        console.log('teams', teams);
    }, []);

    return (
        <View style={{ paddingBottom: 80 }}>
            <SafeView>
                <View style={{ paddingTop: 9 }}>
                    <InfoChild title='Статус тайтла' data={slowDetails?.manga_status} />
                    <InfoChild title='Статус перевода' data={slowDetails?.translation_status} />
                    <InfoChild title='Загружено глав' data={details?.chap_count} />
                    <InfoChild title='Автор' data={slowDetails?.author} />
                    <InfoChild title='Художник' data={slowDetails?.artist} />
                    {/* <Text style={{ paddingVertical: 4 }}>
                    <Text style={{ color: '#868E96' }}>Издатели: </Text>
                    <Text style={{ ...AppTheme.textWhite }}>{slowDetails?.publisher}</Text>
                </Text> */}
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
                            <Text style={{ color: 'white', fontWeight: '600', marginVertical: 12, fontSize: 16 }}>Переводчики</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                                {teams.map((team: ITeams) => {
                                    console.log(`https://mangalib.me/uploads/team/${team.slug}/cover/${team.cover}_250x350.jpg`);
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
                                                <Image
                                                    source={{ uri: `https://cover.imglib.info/uploads/no-image.png` }}
                                                    style={{ height: 30, width: 20, resizeMode: 'cover' }}
                                                />
                                            )}
                                            <Text style={{ color: '#ddd', marginHorizontal: 8 }}>{team.name}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </>
                    ) : null}
                </View>
            </SafeView>
            <Separator />
        </View>
    );
};

export default MangaInformation;
