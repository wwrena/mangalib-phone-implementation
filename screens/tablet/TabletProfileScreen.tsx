import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { IBookmark } from '../../types/IBookmark';
import SafeView from '../../components/childs/SafeView';
import AutoHeightImage from 'react-native-auto-height-image';
import cheerio from 'cheerio';
import Avatar from '../../components/profile/Avatar';
import MangaView from '../../components/profile/MangaView';

type Props = { route: any };

const TabletProfileScreen: React.FC<Props> = ({ route }) => {
    const props: any = route.params;
    const profile = props.userData;
    const [bookmarks, setBookmarks] = useState<any | null>(null);
    const [folders, setFolders] = useState<any>(null);
    const [length, setLength] = useState<number>(0);
    const [current, setCurrent] = useState<number>(-1);

    function removeDuplicates(bookmarks: IBookmark[]): IBookmark[] {
        const uniqueSlugs: Record<string, boolean> = {};
        const uniqueBookmarks: IBookmark[] = [];

        for (const bookmark of bookmarks) {
            if (!uniqueSlugs[bookmark.slug]) {
                uniqueSlugs[bookmark.slug] = true;
                uniqueBookmarks.push(bookmark);
            }
        }

        return uniqueBookmarks;
    }

    useEffect(() => {
        fetch(`https://mangalib.me/bookmark/${profile.id}`).then((res) => {
            res.text().then((res: any) => {
                const result = JSON.parse(res);
                const unique = removeDuplicates(result.items);
                setBookmarks(unique);
            });
            let localLength: number = 0;
            folders.folders.forEach((element: any) => {
                const folderBookmarks = bookmarks.filter((bookmark: any) => bookmark.status === element.id);
                localLength = localLength + folderBookmarks.length;
            });
            setLength(localLength);
        });

        fetch(`https://mangalib.me/user/${profile.id}`).then((res) => {
            res.text().then((res: any) => {
                const $ = cheerio.load(res);

                const chapter = $('script:contains("window.__DATA__")').html();

                const regex = /window\.__DATA__\s*=\s*(.*);/;
                const match = chapter?.match(regex);
                if (match) {
                    setFolders(JSON.parse(match[1]));
                }
            });
        });
    }, []);

    return (
        <View style={{ backgroundColor: '#111', height: '100%' }}>
            <ScrollView style={{ height: '100%' }}>
                <View style={{ backgroundColor: '#141414' }}>
                    <SafeView style={{ display: 'flex', flexDirection: 'row', paddingVertical: 6, paddingTop: 30 }}>
                        <Avatar avatar={profile.avatar} url={`https://cover.imglib.info/uploads/users/${profile.id}/${profile.avatar}`} />
                        <View style={{ marginVertical: 6 }}>
                            <Text style={{ color: '#ddd', fontWeight: '600', fontSize: 16 }}>{profile.value ? profile.value : profile.username}</Text>
                        </View>
                    </SafeView>
                </View>
                <SafeView style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 100 }}>
                    <View style={{ width: '12%', marginTop: 50 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setCurrent(-1);
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'baseline',
                                    justifyContent: 'space-between',
                                    paddingVertical: 7,
                                }}
                            >
                                <Text style={{ color: '#ddd' }}>Все</Text>
                                <Text style={{ color: '#868e96', fontSize: 11 }}>{length}</Text>
                            </View>
                        </TouchableOpacity>
                        {folders && bookmarks
                            ? folders.folders.map((item: any) => {
                                  const folderBookmarks = bookmarks.filter((bookmark: any) => bookmark.status === item.id);
                                  return (
                                      <TouchableOpacity
                                          onPress={() => {
                                              setCurrent(item.id);
                                          }}
                                      >
                                          <View
                                              style={{
                                                  display: 'flex',
                                                  flexDirection: 'row',
                                                  alignItems: 'baseline',
                                                  justifyContent: 'space-between',
                                                  paddingVertical: 7,
                                              }}
                                          >
                                              <Text style={{ color: '#ddd' }}>{item.name}</Text>
                                              <Text style={{ color: '#868e96', fontSize: 11 }}>{folderBookmarks.length} </Text>
                                          </View>
                                      </TouchableOpacity>
                                  );
                              })
                            : null}
                    </View>
                    {bookmarks && folders ? <MangaView current={current} bookmarks={bookmarks} /> : null}
                </SafeView>
            </ScrollView>
        </View>
    );
};

export default TabletProfileScreen;
