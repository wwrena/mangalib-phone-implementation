import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import Heading from '../Text/Heading';
import cheerio from 'cheerio';
import Separator from '../Separator';
import SafeView from '../childs/SafeView';

type Props = {
    url: any;
    isTablet: boolean;
};

const Similar: React.FC<Props> = ({ url, isTablet }): any => {
    const [data, setData] = useState<any>([]);
    const [pending, setPending] = useState<Boolean>(false);

    useEffect(() => {
        setPending(true);
        fetch(url).then((res) => {
            res.text().then((res) => {
                const $ = cheerio.load(res);
                const slider: any = $('[data-slider=similar]');

                const filterData = (obj: any) => {
                    const raw = obj.split('\n').map((title: any) => title.trim());
                    return raw.filter((title: string) => title !== '');
                };

                const getDetails = () => {
                    setData([]);
                    if (slider) {
                        try {
                            slider.each((index: number, element: any) => {
                                const nameRaw = $(element).find('.manga-list-item__name').text().trim();
                                const typeRaw = $(element).find('.manga-list-item__head').text().trim();
                                const metaRaw = $(element).find('.manga-list-item__meta').text().trim();

                                const backgroundImageList: any[] = [];
                                $(element)
                                    .find('.manga-list-item__cover')
                                    .each((index, coverElement) => {
                                        const backgroundImage: any = $(coverElement).css('background-image');
                                        const imageUrl = backgroundImage.replace(/url\(['"]?([^'"]+?)['"]?\)/i, '$1');

                                        const completeImageUrl = imageUrl.includes('cover.imglib.info')
                                            ? imageUrl
                                            : `https://cover.imglib.info${imageUrl}`;

                                        backgroundImageList.push(completeImageUrl);
                                    });

                                const titleName = filterData(nameRaw);
                                const titleType = filterData(typeRaw);
                                const titleMeta = filterData(metaRaw);

                                for (let i = 0; i < titleName.length; i++) {
                                    setData((prev: any) => [
                                        ...prev,
                                        {
                                            name: titleName[i],
                                            type: titleType[i],
                                            meta: titleMeta[i],
                                            cover: backgroundImageList[i],
                                        },
                                    ]);
                                }
                                setPending(false);
                            });
                        } catch (error) {
                            console.error(error);
                        }
                    }
                };

                getDetails();
            });
        });
    }, []);

    if (pending == true) {
        return (
            <View>
                <Heading>Похожее</Heading>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
                        <View
                            style={{
                                width: 310,
                                backgroundColor: 'rgb(37,37,39)',
                                display: 'flex',
                                flexDirection: 'row',
                                overflow: 'hidden',
                                borderRadius: 6,
                            }}
                        >
                            <View style={{ height: 110, width: 85, backgroundColor: '#363636' }} />
                            <View
                                style={{
                                    paddingVertical: 7,
                                    paddingHorizontal: 12,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View>
                                    <View style={{ backgroundColor: '#363636', width: 200, marginBottom: 6, height: 12, borderRadius: 4 }}></View>
                                    <View style={{ width: 200, backgroundColor: '#363636', height: 14, borderRadius: 4 }}></View>
                                </View>
                                <View style={{ backgroundColor: '#363636', width: 50, height: 13, borderRadius: 4 }}></View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: 310,
                                backgroundColor: 'rgb(37,37,39)',
                                display: 'flex',
                                flexDirection: 'row',
                                overflow: 'hidden',
                                borderRadius: 6,
                            }}
                        >
                            <View style={{ height: 110, width: 85, backgroundColor: '#363636' }} />
                            <View
                                style={{
                                    paddingVertical: 7,
                                    paddingHorizontal: 12,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View>
                                    <View style={{ backgroundColor: '#363636', width: 200, marginBottom: 6, height: 12, borderRadius: 4 }}></View>
                                    <View style={{ width: 200, backgroundColor: '#363636', height: 14, borderRadius: 4 }}></View>
                                </View>
                                <View style={{ backgroundColor: '#363636', width: 50, height: 13, borderRadius: 4 }}></View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: 310,
                                backgroundColor: 'rgb(37,37,39)',
                                display: 'flex',
                                flexDirection: 'row',
                                overflow: 'hidden',
                                borderRadius: 6,
                            }}
                        >
                            <View style={{ height: 110, width: 85, backgroundColor: '#363636' }} />
                            <View
                                style={{
                                    paddingVertical: 7,
                                    paddingHorizontal: 12,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View>
                                    <View style={{ backgroundColor: '#363636', width: 200, marginBottom: 6, height: 12, borderRadius: 4 }}></View>
                                    <View style={{ width: 200, backgroundColor: '#363636', height: 14, borderRadius: 4 }}></View>
                                </View>
                                <View style={{ backgroundColor: '#363636', width: 50, height: 13, borderRadius: 4 }}></View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: 310,
                                backgroundColor: 'rgb(37,37,39)',
                                display: 'flex',
                                flexDirection: 'row',
                                overflow: 'hidden',
                                borderRadius: 6,
                            }}
                        >
                            <View style={{ height: 110, width: 85, backgroundColor: '#363636' }} />
                            <View
                                style={{
                                    paddingVertical: 7,
                                    paddingHorizontal: 12,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View>
                                    <View style={{ backgroundColor: '#363636', width: 200, marginBottom: 6, height: 12, borderRadius: 4 }}></View>
                                    <View style={{ width: 200, backgroundColor: '#363636', height: 14, borderRadius: 4 }}></View>
                                </View>
                                <View style={{ backgroundColor: '#363636', width: 50, height: 13, borderRadius: 4 }}></View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    } else if (data.length == 0 && pending == false) {
        return null;
    }

    if (data.length != 0) {
        return (
            <View>
                {isTablet == false ? <Separator /> : null}
                <Heading>Похожее</Heading>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
                        {data.map((item: any, index: number) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: 310,
                                        backgroundColor: 'rgb(37,37,39)',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        overflow: 'hidden',
                                        borderRadius: 6,
                                    }}
                                >
                                    <Image source={{ uri: `${item.cover}` }} style={{ height: 110, width: 85, backgroundColor: '#363636' }} />
                                    <View style={{ paddingVertical: 7, paddingHorizontal: 12, display: 'flex', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ color: '#1484FF', fontSize: 12, marginBottom: 3 }}>{item.type}</Text>
                                            <Text style={{ color: '#ddd', fontWeight: '600', width: 210 }}>{item.name}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default Similar;
