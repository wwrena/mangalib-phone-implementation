import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { ITitle } from '../types/ITitle';
import { AppTheme } from '../styles/AppTheme';
import MangaPoster from '../components/manga/MangaPoster';
import MangaDetailsComponent from '../components/childs/MangaDetailsComponent';
import MangaInfo from '../components/childs/MangaInfo';
import ContentSwitcher from '../components/childs/ContentSwitcher';
import MangaInformation from '../components/manga/MangaInformation';
import MangaChapters from '../components/manga/MangaChapters';
import SafeView from '../components/childs/SafeView';
import cheerio from 'cheerio';
import { ReplaceDetails } from '../utils/ReplaceDetails';
import { ISlowDetails } from '../types/ISlowDetails';
import { useIsFocused } from '@react-navigation/native';
import { ITeams } from '../types/ITeams';

type Props = {
    route: any;
};

const MangaDetails: React.FC<Props> = ({ route }) => {
    const props: any = route.params;
    const details: ITitle = props.details;
    const [switcher, setSwitcher] = useState<string>('Информация');
    const [slowDetails, setSlowDetails] = useState<ISlowDetails | null>(null);
    const [genres, setGenres] = useState<string[] | null>(null);
    const [teams, setTeams] = useState<ITeams[] | null>(null);
    // const isFocused = useIsFocused();

    const setTeamsComponentData = (data: any) => {
        const regex = /window\.__DATA__ = ({[^;]+})/;
        const match = data.match(regex);

        if (match) {
            const jsonString = match[1];
            const dataObject = JSON.parse(jsonString);
            setTeams(dataObject.chapters.teams);
        }
    };

    useEffect(() => {
        try {
            fetch(`${details.href}?section=info`)
                .then((res) => res.text())
                .then((htmlContent) => {
                    setTeamsComponentData(htmlContent);
                    const $ = cheerio.load(htmlContent);
                    const data: any = {};

                    const getDetails = () => {
                        const items = $('.media-info-list__item');

                        items.each((index: number, element: any) => {
                            const parseKey: any = $(element).find('.media-info-list__title').text().trim();
                            const title = ReplaceDetails(parseKey);
                            const value = $(element).find('.media-info-list__value').text().trim();

                            data[title] = value;
                        });
                        if (Object.keys(data).length !== 0) {
                            setSlowDetails(data);
                        }
                    };

                    const getGenres = () => {
                        return new Promise((resolve, reject) => {
                            const genres = $('.media-tags');
                            const localData: string[] = [];

                            genres.find('.media-tag-item').each((index: number, element: any) => {
                                const value = $(element).text().trim();
                                if (!$(element).hasClass('media-tag-item_more')) {
                                    localData.push(value);
                                }
                            });

                            if (localData.length > 0) {
                                resolve(localData);
                            } else {
                                reject('No genres found');
                            }
                        });
                    };

                    getDetails();
                    getGenres().then((res: any) => {
                        setGenres(res);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    // useEffect(() => {
    //     if (isFocused) {
    //         setSwitcher('Информация');
    //     }
    // }, [isFocused]);

    return (
        <ScrollView style={{ backgroundColor: '#111', flex: 1 }}>
            <View style={{ ...AppTheme.flexCenter }}>
                <MangaPoster posterLink={details.coverImage} />
            </View>
            <MangaDetailsComponent>
                <SafeView>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: '#ddd', textAlign: 'center', marginTop: 12, fontSize: 18, fontWeight: '600', maxWidth: '80%' }}>
                            {details.rus_name}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={{ color: '#ddd', textAlign: 'center', fontSize: 15, marginTop: 5 }}>
                        {details.name}
                    </Text>
                    <MangaInfo>
                        {slowDetails ? (
                            <Text style={{ color: slowDetails.age_restriction == '16+' || '18+' ? 'red' : '#ddd' }}>
                                {slowDetails?.age_restriction}
                            </Text>
                        ) : null}
                        <Text style={{ color: '#868e96' }}>{details.releaseDate} г.</Text>
                        {slowDetails ? <Text style={{ color: '#868e96' }}>{slowDetails.type}</Text> : null}
                        <Text style={{ color: '#868e96' }}>
                            <Image source={require('../assets/app/star.png')} style={{ width: 14, height: 14, resizeMode: 'cover' }} />
                            <Text style={{ fontWeight: '600' }}>
                                {' '}
                                {details.rate_avg} <Text style={{ fontWeight: '400' }}>[{(details.rate / 1000).toFixed(1)}K]</Text>
                            </Text>
                        </Text>
                    </MangaInfo>
                </SafeView>
                <ContentSwitcher>
                    <TouchableOpacity
                        style={{ borderBottomWidth: 1, borderBottomColor: switcher == 'Информация' ? 'orange' : 'rgba(0,0,0,0)', paddingBottom: 13 }}
                        onPress={() => {
                            setSwitcher('Информация');
                        }}
                    >
                        <Text style={{ color: switcher == 'Информация' ? '#ddd' : '#aaa' }}>Информация</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ borderBottomWidth: 1, borderBottomColor: switcher == 'Главы' ? 'orange' : 'rgba(0,0,0,0)', paddingBottom: 13 }}
                        onPress={() => {
                            setSwitcher('Главы');
                        }}
                    >
                        <Text style={{ color: switcher == 'Главы' ? '#ddd' : '#aaa' }}>Главы</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ borderBottomWidth: 1, borderBottomColor: switcher == 'Комментарии' ? 'orange' : 'rgba(0,0,0,0)', paddingBottom: 13 }}
                        onPress={() => {
                            setSwitcher('Комментарии');
                        }}
                    >
                        <Text style={{ color: switcher == 'Комментарии' ? '#ddd' : '#aaa' }}>Комментарии</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ borderBottomWidth: 1, borderBottomColor: switcher == 'Обсуждение' ? 'orange' : 'rgba(0,0,0,0)', paddingBottom: 13 }}
                        onPress={() => {
                            setSwitcher('Обсуждение');
                        }}
                    >
                        <Text style={{ color: switcher == 'Обсуждение' ? '#ddd' : '#aaa' }}>Обсуждение</Text>
                    </TouchableOpacity>
                </ContentSwitcher>

                {/* Conditional rendering */}

                {switcher == 'Информация' ? <MangaInformation details={details} slowDetails={slowDetails} genres={genres} teams={teams} /> : null}
                {switcher == 'Главы' ? <MangaChapters mangaLink={details.href} details={details} /> : null}
            </MangaDetailsComponent>
        </ScrollView>
    );
};

export default MangaDetails;
