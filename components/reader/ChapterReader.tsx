import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, SafeAreaView, Image, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { IChapterImage } from '../../types/IChapterImage';
import { ITitle } from '../../types/ITitle';
import SafeView from '../childs/SafeView';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import ScrollIndicator from './ScrollIndicator';

type Props = {
    route: any;
};

const ChapterReader: React.FC<Props> = ({ route }) => {
    const props = route.params;
    const details: ITitle = props.mangaInfo;
    const images: IChapterImage[] = props.images;
    const serverLink: string = props.serverLink;
    const chapterInfo: string = props.chapterInfo;
    const deviceWidth = () => {
        const width = Dimensions.get('window').width;
        if (width > 960) {
            return 680;
        }
        return width;
    };
    const navigation: any = useNavigation();

    const scrollViewRef = useRef(null);
    const [pages, setPages] = useState<number>(1);
    const [scrollIndex, setScrollIndex] = useState<number>(1);
    const [counterShouldDisplay, setCounterShouldDisplay] = useState<Boolean>(false);

    useEffect(() => {
        setPages(images.length);
    }, []);

    const scrollHandler = (event: any) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round((contentOffsetY / Dimensions.get('window').height) * 1.5);
        if (index >= 0) {
            setScrollIndex(index + 1);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#141414' }}>
            <ScrollIndicator scrollIndex={scrollIndex} pages={pages} counterShouldDisplay={counterShouldDisplay} />
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={{ paddingBottom: 12 }}
            >
                <SafeView>
                    <Text style={{ color: '#ddd', fontWeight: '600' }} numberOfLines={1}>
                        {details.rus_name}
                    </Text>
                    <Text style={{ color: '#aaa' }}>{chapterInfo}</Text>
                </SafeView>
            </TouchableOpacity>
            <ScrollView style={{ backgroundColor: '#111' }} ref={scrollViewRef} onScroll={scrollHandler} scrollEventThrottle={100}>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    {images
                        ? images.map((image: IChapterImage, index: number) => {
                              return (
                                  <AutoHeightImage
                                      key={index}
                                      width={deviceWidth()}
                                      onLoad={() => {
                                          if (counterShouldDisplay == false) setCounterShouldDisplay(true);
                                      }}
                                      onError={(error) => {
                                          console.warn(`Failed to load ${serverLink + image.u}. Reason: ${error}`);
                                      }}
                                      source={{ uri: serverLink + image.u }}
                                  />
                              );
                          })
                        : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChapterReader;
