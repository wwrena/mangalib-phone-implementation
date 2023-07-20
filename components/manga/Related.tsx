import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Heading from '../Text/Heading';
import cheerio from 'cheerio';

type Props = {
    url: any;
};

const Related: React.FC<Props> = ({ url }) => {
    const [data, setData] = useState<Object[] | null>(null);
    useEffect(() => {
        fetch(url).then((res) => {
            res.text().then((res) => {
                const $ = cheerio.load(res);
                const slider: any = $('[data-slider=related]');

                const filterData = (obj: any) => {
                    const raw = obj.split('\n').map((title: any) => title.trim());
                    return raw.filter((title: string) => title !== '');
                };

                const getDetails = () => {
                    if (slider) {
                        try {
                            slider.each((index: number, element: any) => {
                                const nameRaw = $(element).find('.manga-list-item__name').text().trim();
                                const typeRaw = $(element).find('.manga-list-item__head').text().trim();
                                const metaRaw = $(element).find('.manga-list-item__meta').text().trim();
                                const coverRaw = $(element).find('.manga-list-item__cover').text().trim();

                                const titleName = filterData(nameRaw);
                                const titleType = filterData(typeRaw);
                                const titleMeta = filterData(metaRaw);
                                const titleCover = filterData(coverRaw);

                                setData(titleName);
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
    return (
        <View>
            <Heading>Связанное</Heading>
            {data
                ? data.map((item: any) => {
                      return (
                          <View key={item.titleName}>
                              <Text>{item}</Text>
                          </View>
                      );
                  })
                : null}
        </View>
    );
};

export default Related;
