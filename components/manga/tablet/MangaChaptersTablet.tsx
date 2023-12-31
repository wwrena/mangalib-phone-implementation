import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { IChapter } from '../../../types/IChapter';
import { ITitle } from '../../../types/ITitle';
import SafeView from '../../childs/SafeView';
import cheerio from 'cheerio';
import { useNavigation } from '@react-navigation/native';
import { AppTheme } from '../../../styles/AppTheme';
import { getTimeAgo } from '../../../utils/comments/FormatDate';

type Props = {
    mangaLink: string;
    details: ITitle;
};

const MangaChaptersTablet: React.FC<Props> = ({ mangaLink, details }) => {
    const navigation: any = useNavigation();
    const [chapters, setChapters] = useState<IChapter[] | null>(null);
    const [reversed, setReversed] = useState<Boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(details.href);
            const text = await res.text();

            const regex = /window\.__DATA__ = ({[^;]+})/;
            const match = text.match(regex);

            if (match) {
                const jsonString = match[1];
                const dataObject = JSON.parse(jsonString);
                setChapters(dataObject.chapters.list);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchData();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleChapterClick = async (item: IChapter) => {
        fetch(`${mangaLink}/v${item.chapter_volume}/c${item.chapter_number}?`).then((response) => {
            response.text().then((html) => {
                const $ = cheerio.load(html);
                const data: any = $('#pg').html()?.split('window.__pg = ')[1].split(';')[0];

                try {
                    const response: any = JSON.parse(data);
                    navigation.navigate('ChapterReader', {
                        mangaInfo: details,
                        images: response,
                        serverLink: `https://img2.mixlib.me/manga${mangaLink.split('https://mangalib.me')[1]}/chapters/${item.chapter_slug}/`,
                        chapterInfo: `Том ${item.chapter_volume} Глава ${item.chapter_number}`,
                    });
                } catch (error) {
                    Alert.alert('Ошибка', `Похоже страница не существует.\nСкорее всего причиной служит возрастное ограничение`, [
                        {
                            text: 'Понятно',
                        },
                    ]);
                }
            });
        });
    };

    return (
        <>
            <View style={{ paddingVertical: 12, borderBottomColor: '#7474811a', borderBottomWidth: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        if (chapters) {
                            const reversed = [...chapters].reverse();
                            setChapters(reversed);
                            setReversed((prev) => !prev);
                        }
                    }}
                >
                    <Text style={{ color: '#ddd' }}>Сортировать {reversed ? 'по возрастанию' : 'по убыванию'}</Text>
                </TouchableOpacity>
            </View>
            {chapters ? (
                chapters.map((item: IChapter) => {
                    return (
                        <TouchableOpacity
                            key={item.chapter_id}
                            onPress={() => {
                                handleChapterClick(item);
                            }}
                        >
                            <View
                                style={{
                                    borderBottomColor: '#7474811a',
                                    borderBottomWidth: 1,
                                    paddingVertical: 12,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text numberOfLines={1} style={{ color: '#fff' }}>
                                    Том {item.chapter_volume} Глава {item.chapter_number} {item.chapter_name ? `- ${item.chapter_name}` : null}
                                </Text>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '30%',
                                    }}
                                >
                                    <Text style={{ color: '#868e96' }}>{item.username}</Text>
                                    <Text style={{ color: '#868e96' }}>{getTimeAgo(item.chapter_created_at)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })
            ) : (
                <View style={{ flex: 1, height: '100%', marginVertical: '30%' }}>
                    <ActivityIndicator />
                    <Text style={{ textAlign: 'center', ...AppTheme.textWhite, fontWeight: '500', marginTop: 14 }}>
                        Загружаем главы. Никуда не уходите
                    </Text>
                </View>
            )}
        </>
    );
};

export default MangaChaptersTablet;
