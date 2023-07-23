import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IBookmark } from '../../types/IBookmark';
import SafeView from '../../components/childs/SafeView';
import AutoHeightImage from 'react-native-auto-height-image';
import cheerio from 'cheerio';
import Avatar from '../../components/profile/Avatar';

type Props = { route: any };

const TabletProfileScreen: React.FC<Props> = ({ route }) => {
    const props: any = route.params;
    const profile = props.userData;
    const [bookmarks, setBookmarks] = useState<any | null>(null);
    const [bookmarkLength, setBookmarkLength] = useState<any>(null);
    const [folders, setFolders] = useState<any>(null);

    useEffect(() => {
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
        fetch(`https://mangalib.me/bookmark/${profile.id}`).then((res) => {
            res.text().then((res: any) => {
                const result = JSON.parse(res);
                const unique = removeDuplicates(result.items);
                setBookmarks(unique);
            });
        });

        if (bookmarks) {
            let maxValue = 0;
            for (let x = 0; x < bookmarks.length; x++) {
                if (maxValue < bookmarks[x].status) {
                    maxValue = bookmarks[x].status;
                }
            }
            const filteredStatusObject: any = [];
            const statusLength: any = [];

            for (let i = 1; i <= maxValue; i++) {
                const filteredBookmarks = bookmarks.filter((obj: any) => obj.status === i);

                statusLength[i] = { name: folders.folders[i]?.name, length: filteredBookmarks.length };
                filteredStatusObject[`${i}`] = filteredBookmarks;
            }
            setBookmarkLength(statusLength);
            console.log(bookmarkLength);
            setBookmarks(filteredStatusObject);
        }
    }, []);

    return (
        <View style={{ backgroundColor: '#111', height: '100%' }}>
            <ScrollView style={{ height: '100%' }}>
                <View style={{ backgroundColor: '#141414' }}>
                    <SafeView style={{ display: 'flex', flexDirection: 'row', paddingVertical: 6 }}>
                        <Avatar avatar={profile.avatar} url={`https://cover.imglib.info/uploads/users/${profile.id}/${profile.avatar}`} />
                        <View style={{ marginVertical: 6 }}>
                            <Text style={{ color: '#ddd', fontWeight: '600', fontSize: 16 }}>{profile.value ? profile.value : profile.username}</Text>
                        </View>
                    </SafeView>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* {bookmarkLength ? (
                        <SafeView style={{ marginVertical: 12, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 180 }}>
                            <TouchableOpacity>
                                <Text style={{ color: '#ddd' }}>
                                     <Text style={{ color: '#868e96', fontSize: 11 }}>{bookmarkLength['1']}</Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ color: '#ddd' }}>
                                    Читаю <Text style={{ color: '#868e96', fontSize: 11 }}>{bookmarks?.length}</Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ color: '#ddd' }}>
                                    В планах <Text style={{ color: '#868e96', fontSize: 11 }}>{bookmarks?.length}</Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ color: '#ddd' }}>
                                    Брошено <Text style={{ color: '#868e96', fontSize: 11 }}>{bookmarks?.length}</Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ color: '#ddd' }}>
                                    Прочитано <Text style={{ color: '#868e96', fontSize: 11 }}>{bookmarks?.length}</Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ color: '#ddd' }}>
                                    Любимые <Text style={{ color: '#868e96', fontSize: 11 }}>{bookmarks?.length}</Text>
                                </Text>
                            </TouchableOpacity>
                        </SafeView>
                    ) : null} */}
                    {/* {folders ? (
                        <View>
                            {folders.folders.map((item: any) => {
                                return (
                                    <View>
                                        <Text style={{ color: 'white' }}>{JSON.stringify(bookmarks[item.id])}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    ) : null} */}
                    {/* <View>
                        {bookmarks
                            ? bookmarks.map((title: IBookmark, index: number) => {
                                  return (
                                      <View
                                          key={index}
                                          style={{
                                              paddingVertical: 8,
                                              paddingHorizontal: 10,
                                              borderBottomColor: '#38383A',
                                              borderBottomWidth: 1,
                                              backgroundColor: '#141414',
                                          }}
                                      >
                                          <View
                                              style={{
                                                  display: 'flex',
                                                  flexDirection: 'row',
                                              }}
                                          >
                                              <Image
                                                  source={{ uri: `https://mangalib.me/uploads/cover/${title.slug}/cover/${title.cover}_thumb.jpg` }}
                                                  style={{ height: 90, width: 60, backgroundColor: 'white', marginRight: 12, borderRadius: 3 }}
                                              />
                                              <View style={{ marginVertical: 6, maxWidth: '80%' }}>
                                                  <Text style={{ color: '#ddd' }}>
                                                      {title.rus_name} <Text style={{ color: '#868e96' }}>/ {title.manga_name}</Text>
                                                  </Text>
                                                  <Text style={{ color: '#ddd' }}>
                                                      Продолжить [{title.last_chapter.volume}-{title.last_chapter.number}]
                                                  </Text>
                                              </View>
                                          </View>
                                      </View>
                                  );
                              })
                            : null}
                    </View> */}
                </View>
            </ScrollView>
        </View>
    );
};

export default TabletProfileScreen;
