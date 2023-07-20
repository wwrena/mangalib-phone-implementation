import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { IChapter } from '../../types/IChapter';
import { ITitle } from '../../types/ITitle';
import SafeView from '../childs/SafeView';
import cheerio from 'cheerio';
import { useNavigation } from '@react-navigation/native';

type Props = {
    mangaLink: string;
    details: ITitle;
};

const MangaChapters: React.FC<Props> = ({ mangaLink, details }) => {
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
        const response = await fetch(`${mangaLink}/v${item.chapter_volume}/c${item.chapter_number}?`);
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
                Alert.alert('Ошибка', `Похоже страница не существует или на ней отсутствуют данные.\n\n${error}`, [
                    {
                        text: 'Понятно',
                    },
                ]);
            }
        });
    };

    return (
        <SafeView>
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
                            onPress={() => {
                                handleChapterClick(item);
                            }}
                        >
                            <View style={{ borderBottomColor: '#7474811a', borderBottomWidth: 1, paddingVertical: 8 }}>
                                <Text numberOfLines={1} style={{ color: '#ddd' }}>
                                    Том {item.chapter_volume} Глава {item.chapter_number} {item.chapter_name ? `- ${item.chapter_name}` : null}
                                </Text>
                                <View style={{ display: 'flex', gap: 8, flexDirection: 'row', marginTop: 4 }}>
                                    <Text style={{ color: '#868e96' }}>{item.chapter_created_at.split(' ')[0].replaceAll('-', '.')}</Text>
                                    <Text style={{ color: '#868e96' }}>{item.username}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })
            ) : (
                <ActivityIndicator style={{ flex: 1, height: '100%', marginVertical: '30%' }} />
            )}
        </SafeView>
    );
};

export default MangaChapters;
