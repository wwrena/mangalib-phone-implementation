import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, TouchableOpacity, ImageBackground, Touchable, Alert } from 'react-native';
import { ITitle } from '../../types/ITitle';
import ContentSwitcher from '../../components/childs/ContentSwitcher';
import SafeView from '../../components/childs/SafeView';
import cheerio from 'cheerio';
import { ReplaceDetails } from '../../utils/ReplaceDetails';
import { ISlowDetails } from '../../types/ISlowDetails';
import { ITeams } from '../../types/ITeams';
import AutoHeightImage from 'react-native-auto-height-image';
import { clearSpaces } from '../../utils/ClearSpaces';
import MangaInformationTablet from '../../components/manga/tablet/MangaInformationTablet';
import MangaChaptersTablet from '../../components/manga/tablet/MangaChaptersTablet';
import CommentsTablet from '../../components/manga/tablet/comments/CommentsTablet';
import { useNavigation } from '@react-navigation/native';
import { isTablet } from '../../other/constants';

type Props = {
    route: any;
};

const TabletMangaDetails: React.FC<Props> = ({ route }) => {
    const props: any = route.params;
    const details: ITitle = props.details;
    const [switcher, setSwitcher] = useState<string>('Информация');
    const [slowDetails, setSlowDetails] = useState<ISlowDetails | null>(null);
    const [genres, setGenres] = useState<string[] | null>(null);
    const [teams, setTeams] = useState<ITeams[] | null>(null);
    const [chapterInfo, setChapterInfo] = useState<any>(null);
    const [failure, setFailure] = useState<Boolean>(false);
    const navigation: any = useNavigation();
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

                    const chapter = $('script:contains("window.__DATA__")').html();

                    const regex = /window\.__DATA__\s*=\s*(.*);/;
                    const match = chapter?.match(regex);

                    if (match && match.length === 2) {
                        const dataValue = JSON.parse(match[1]);
                        setChapterInfo(dataValue.chapters.list.at(-1));
                    }

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
                    setFailure(true);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const startReading = async () => {
        const response = await fetch(`${details.href}/v1/c1?`);
        response.text().then((html) => {
            const $ = cheerio.load(html);
            const data: any = $('#pg').html()?.split('window.__pg = ')[1].split(';')[0];

            console.log(data);

            try {
                const response: any = JSON.parse(data);
                navigation.navigate('ChapterReader', {
                    mangaInfo: details,
                    images: response,
                    serverLink: `https://img2.mixlib.me/manga${details.href.split('https://mangalib.me')[1]}/chapters/${chapterInfo.chapter_slug}/`,
                    chapterInfo: `Том ${chapterInfo.chapter_volume} Глава ${chapterInfo.chapter_number}`,
                });
                setSwitcher('Главы');
            } catch (error) {
                Alert.alert('Ошибка', `Похоже страница не существует или на ней отсутствуют данные.\n\n${error}`, [
                    {
                        text: 'Понятно',
                    },
                ]);
            }
        });
    };

    // useEffect(() => {
    //     if (isFocused) {
    //         setSwitcher('Информация');
    //     }
    // }, [isFocused]);

    return (
        <ScrollView style={{ backgroundColor: '#111', flex: 1 }}>
            {details.background ? (
                <ImageBackground
                    source={{ uri: `https://cover.imglib.info/uploads/cover/${details.slug}/background/${details.background}` }}
                    style={{ width: '100%', height: 300 }}
                >
                    <View style={{ width: '100%', height: 300, backgroundColor: 'rgba(0,0,0,.6)' }}></View>
                </ImageBackground>
            ) : (
                <ImageBackground blurRadius={3} source={{ uri: details.coverImage }} style={{ width: '100%', height: 300 }}>
                    <View style={{ width: '100%', height: 300, backgroundColor: 'rgba(0,0,0,.6)' }}></View>
                </ImageBackground>
            )}
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View>
                    <SafeView style={{ position: 'relative', top: -80, maxWidth: 280 }}>
                        <AutoHeightImage source={{ uri: details.coverImage }} width={280} style={{ borderRadius: 6, marginBottom: 17 }} />
                        <TouchableOpacity onPress={() => startReading()}>
                            <View
                                style={{
                                    backgroundColor: '#ffa332',
                                    height: 32,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                    }}
                                >
                                    Начать читать
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {slowDetails ? (
                            <View style={{ backgroundColor: '#1c1c1e', borderRadius: 3, marginTop: 17, paddingVertical: 9, paddingHorizontal: 8 }}>
                                {slowDetails ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Тип</Text>
                                        <Text style={{ color: '#ddd' }}>{slowDetails.type}</Text>
                                    </View>
                                ) : null}
                                {slowDetails ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Год релиза</Text>
                                        <Text style={{ color: '#ddd' }}>{details.releaseDate} г.</Text>
                                    </View>
                                ) : null}
                                {slowDetails?.manga_status ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Статус тайтла</Text>
                                        <Text style={{ color: '#ddd' }}>{slowDetails.manga_status}</Text>
                                    </View>
                                ) : null}
                                {slowDetails?.translation_status ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Статус перевода</Text>
                                        <Text style={{ color: '#ddd' }}>{slowDetails.translation_status}</Text>
                                    </View>
                                ) : null}
                                {slowDetails?.author ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Автор</Text>
                                        <Text style={{ color: '#ddd' }}>{clearSpaces(slowDetails.author)}</Text>
                                    </View>
                                ) : null}
                                {slowDetails?.artist ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Художник</Text>
                                        <Text style={{ color: '#ddd' }}>{clearSpaces(slowDetails.artist)}</Text>
                                    </View>
                                ) : null}
                                {slowDetails?.publisher ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Издательство</Text>
                                        <Text style={{ color: '#ddd' }}>{clearSpaces(slowDetails.publisher)}</Text>
                                    </View>
                                ) : null}
                                {slowDetails?.age_restriction ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Возрастное ограничение</Text>
                                        <Text style={{ color: slowDetails.age_restriction == '16+' || '18+' ? 'red' : '#ddd' }}>
                                            {slowDetails.age_restriction}
                                        </Text>
                                    </View>
                                ) : null}
                                {slowDetails ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Загружено глав</Text>
                                        <Text style={{ color: '#ddd' }}>{details.chap_count}</Text>
                                    </View>
                                ) : null}
                                {slowDetails ? (
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: '#868e96' }}>Альтернативные названия</Text>
                                        <Text style={{ color: '#ddd' }}>{details.rus_name}</Text>
                                    </View>
                                ) : null}
                            </View>
                        ) : null}
                    </SafeView>
                </View>
                <View style={{ position: 'relative', top: -80, width: '77%' }}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>{details.rus_name}</Text>
                    <Text style={{ color: 'white', fontSize: 18 }}>{details.name}</Text>
                    <View style={{ backgroundColor: 'rgb(28,28,30)', borderRadius: 4, marginTop: 12, minHeight: 600 }}>
                        <SafeView>
                            <SafeView>
                                <ContentSwitcher isTablet={isTablet} style={{ gap: 18 }}>
                                    <TouchableOpacity
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: switcher == 'Информация' ? 'orange' : 'rgba(0,0,0,0)',
                                            paddingBottom: 13,
                                        }}
                                        onPress={() => {
                                            setSwitcher('Информация');
                                        }}
                                    >
                                        <Text style={{ color: switcher == 'Информация' ? '#ddd' : '#aaa' }}>Информация</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: switcher == 'Главы' ? 'orange' : 'rgba(0,0,0,0)',
                                            paddingBottom: 13,
                                        }}
                                        onPress={() => {
                                            setSwitcher('Главы');
                                        }}
                                    >
                                        <Text style={{ color: switcher == 'Главы' ? '#ddd' : '#aaa' }}>Главы</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: switcher == 'Комментарии' ? 'orange' : 'rgba(0,0,0,0)',
                                            paddingBottom: 13,
                                        }}
                                        onPress={() => {
                                            setSwitcher('Комментарии');
                                        }}
                                    >
                                        <Text style={{ color: switcher == 'Комментарии' ? '#ddd' : '#aaa' }}>Комментарии</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: switcher == 'Обсуждение' ? 'orange' : 'rgba(0,0,0,0)',
                                            paddingBottom: 13,
                                        }}
                                        onPress={() => {
                                            setSwitcher('Обсуждение');
                                        }}
                                    >
                                        <Text style={{ color: switcher == 'Обсуждение' ? '#ddd' : '#aaa' }}>Обсуждение</Text>
                                    </TouchableOpacity>
                                </ContentSwitcher>
                                {switcher == 'Информация' ? <MangaInformationTablet details={details} genres={genres} teams={teams} /> : null}
                                {switcher == 'Главы' ? <MangaChaptersTablet mangaLink={details.href} details={details} /> : null}
                                {switcher == 'Комментарии' ? <CommentsTablet id={details.id} /> : null}
                            </SafeView>
                        </SafeView>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default TabletMangaDetails;
