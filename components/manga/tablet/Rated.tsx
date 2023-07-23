import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import cheerio from 'cheerio';

type Props = {
    url: string;
    isTablet: Boolean;
    rate: string;
};

const Rated: React.FC<Props> = ({ url, isTablet, rate }) => {
    const [listed, setListed] = useState<Object[] | null>(null);
    const [overall, setOverall] = useState<number>(0);
    useEffect(() => {
        fetch(url).then((res) => {
            res.text().then((res) => {
                const $ = cheerio.load(res);

                const items: any = $('.media-stats-item');

                let data: any = {};
                items.each((index: number, element: any) => {
                    const listedKey: any = $(element).find('.media-stats-item__title').text().trim();
                    const rawValue: any = $(element).find('.media-stats-item__count').text().trim();
                    const value = parseInt(rawValue);

                    data[index] = { listedKey, value };
                });

                let firstObject: any = {};
                let secondObject: any = {};
                let foundKey = false;
                let sum = 0;

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const element = data[key];
                        if (element.listedKey === '10') {
                            foundKey = true;
                        }

                        if (foundKey) {
                            firstObject[key] = element;
                            sum += element.value;
                        } else {
                            secondObject[key] = element;
                        }
                    }
                }

                setListed(Object.keys(firstObject).map((key) => firstObject[key]));
                setOverall(sum);
            });
        });
    }, []);
    return (
        <View style={{ marginVertical: 18 }}>
            {overall != 0 ? (
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
                    <Text style={{ color: '#ddd', fontSize: 15, fontWeight: '600', marginBottom: 10, marginRight: '27%' }}>Оценки пользователей</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Image source={require('../../../assets/app/star.png')} style={{ width: 15, height: 15, marginRight: 3 }} />
                        <Text style={{ color: 'white', fontWeight: '700' }}>{rate}</Text>
                        <Text style={{ color: '#ddd', fontSize: 12, position: 'relative', top: 2 }}> {(overall / 1000).toFixed(1)}К</Text>
                    </View>
                </View>
            ) : null}
            {listed ? (
                <View style={{ display: 'flex', gap: 8 }}>
                    {listed.map((item: any) => {
                        return (
                            <View key={item.value} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#ddd', width: '7%' }}>{item.listedKey}</Text>
                                <View style={{ width: '30%', backgroundColor: '#7474811a', borderRadius: 8, overflow: 'hidden' }}>
                                    <View
                                        style={{
                                            backgroundColor: '#ffa332',
                                            width: `${((item.value / overall) * 100).toFixed(1)}%`,
                                            borderRadius: 8,
                                            height: 8,
                                        }}
                                    ></View>
                                </View>
                                <Text style={{ color: '#ddd', fontWeight: '700', width: '10%', marginLeft: 12 }}>
                                    {((item.value / overall) * 100).toFixed(1)}%
                                </Text>
                                <Text style={{ color: '#868e96' }}>{item.value}</Text>
                            </View>
                        );
                    })}
                </View>
            ) : null}
        </View>
    );
};

export default Rated;
