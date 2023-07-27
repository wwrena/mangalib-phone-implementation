import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

type Props = {
    bookmarks: any;
    current: number;
};

const MangaView: React.FC<Props> = ({ current, bookmarks }) => {
    const [componentBookmarks, setBookmarks] = useState<any>();

    useEffect(() => {
        if (bookmarks == null) {
            return;
        }
        if (current == -1) {
            setBookmarks(bookmarks);
            return;
        } else {
            const folderBookmarks = bookmarks.filter((bookmark: any) => bookmark.status === current);
            setBookmarks(folderBookmarks);
        }
    }, [current]);

    return (
        <View style={{ backgroundColor: '#1c1c1e', width: '75%', marginLeft: 16, marginTop: 50, borderRadius: 4 }}>
            {componentBookmarks && componentBookmarks.length != 0 ? (
                componentBookmarks.map((item: any) => {
                    return (
                        <View style={{ display: 'flex', flexDirection: 'row', paddingVertical: 8, paddingTop: 12, paddingHorizontal: 16 }}>
                            <AutoHeightImage
                                width={60}
                                source={{ uri: `https://mangalib.me/uploads/cover/${item.slug}/cover/${item.cover}_thumb.jpg` }}
                                style={{ borderRadius: 4 }}
                            />
                            <View style={{ borderBottomColor: '#38383a', borderBottomWidth: 1, width: '90%', marginLeft: 12, paddingBottom: 12 }}>
                                <Text style={{ color: '#ddd', fontSize: 15 }}>
                                    {item.rus_name}
                                    <Text style={{ color: '#868e96' }}> / {item.manga_name}</Text>
                                </Text>
                                {item.last_chapter?.number ? (
                                    <Text style={{ color: '#ddd', marginTop: 5, fontSize: 13 }}>Последняя глава {item.last_chapter.number}</Text>
                                ) : null}
                                {item.lastBookmark ? (
                                    <Text style={{ color: '#868e96', fontSize: 13, marginTop: 4 }}>
                                        Продолжить [{`${item.lastBookmark.volume}-${item.lastBookmark.number}`}]
                                    </Text>
                                ) : null}
                            </View>
                        </View>
                    );
                })
            ) : (
                <View style={{ paddingHorizontal: '42%', width: '110%', paddingVertical: '10%' }}>
                    <Text style={{ color: '#aaa' }}>Здесь нет закладок</Text>
                </View>
            )}
        </View>
    );
};

export default MangaView;
