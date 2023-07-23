import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import cheerio from 'cheerio';

type Props = {
    url: string;
    isTablet: Boolean;
};

const Listed: React.FC<Props> = ({ url, isTablet }) => {
    const [listed, setListed] = useState<Object[] | null>(null);
    useEffect(() => {
        fetch(url).then((res) => {
            res.text().then((res) => {
                const $ = cheerio.load(res);

                const items: any = $('.media-stats-item');

                let data: any = {};
                items.each((index: number, element: any) => {
                    const parseKey: any = $(element).find('.media-stats-item__title').text().trim();
                    const rawValue: any = $(element).find('.media-stats-item__count').text().trim();
                    const value = parseInt(rawValue);

                    data[index] = { parseKey, value };
                });

                let firstObject: any = {};
                let secondObject: any = {};
                let foundKey = false;

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const element = data[key];
                        if (element.parseKey === '10') {
                            foundKey = true;
                        }

                        if (foundKey) {
                            secondObject[key] = element;
                        } else {
                            firstObject[key] = element;
                        }
                    }
                }

                setListed(firstObject);
            });
        });
    }, []);
    return (
        <View>
            {listed
                ? listed.map((item: any) => {
                      return (
                          <View>
                              <Text>{item.parseKey}</Text>
                          </View>
                      );
                  })
                : null}
        </View>
    );
};

export default Listed;
