import React, { useEffect } from 'react';
import { ScrollView, Text, SafeAreaView, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { IChapterImage } from '../types/IChapterImage';
import { ITitle } from '../types/ITitle';
import SafeView from './childs/SafeView';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';

type Props = {
    route: any;
};

const ChapterReader: React.FC<Props> = ({ route }) => {
    const props = route.params;
    const details: ITitle = props.mangaInfo;
    const images: IChapterImage[] = props.images;
    const serverLink: string = props.serverLink;
    const chapterInfo: string = props.chapterInfo;
    const deviceWidth = Dimensions.get('window').width;

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: '#141414' }}>
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
            <ScrollView style={{ backgroundColor: '#111' }}>
                {images
                    ? images.map((image: IChapterImage) => {
                          return (
                              <AutoHeightImage
                                  width={deviceWidth}
                                  onError={() => {
                                      console.warn(`Failed to load ${serverLink + image.u}`);
                                  }}
                                  source={{ uri: serverLink + image.u }}
                              />
                          );
                      })
                    : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChapterReader;
