import React, { useEffect, useRef, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
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
        const index = Math.round(contentOffsetY / Dimensions.get('window').height);
        if (index >= 0) {
            setScrollIndex(index + 1);
        }
    };

    const renderItem: React.FC<{ item: any }> = ({ item }) => {
        return (
            <AutoHeightImage
                style={{ alignSelf: 'center', marginBottom: 2 }}
                width={deviceWidth()}
                onLoad={() => {
                    if (counterShouldDisplay == false) setCounterShouldDisplay(true);
                }}
                onError={(error) => {
                    console.warn(`Failed to load ${serverLink + item.u}. Reason: ${error}`);
                }}
                source={{ uri: serverLink + item.u }}
            />
        );
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
            <FlatList
                onScroll={scrollHandler}
                scrollEventThrottle={100}
                ref={scrollViewRef}
                style={{ width: '100%' }}
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => item.p.toString()}
            />
        </SafeAreaView>
    );
};

export default ChapterReader;
