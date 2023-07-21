import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { IBookmark } from '../types/IBookmark';
import SafeView from '../components/childs/SafeView';
import AutoHeightImage from 'react-native-auto-height-image';
import cheerio from 'cheerio';
import Avatar from '../components/profile/Avatar';

type Props = { route: any };

const ProfileScreen: React.FC<Props> = ({ route }) => {
    const props: any = route.params;
    const profile = props.userData;
    const [bookmarks, setBookmarks] = useState<any | null>(null);

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
        fetch(`https://mangalib.me/bookmark/${profile.id}`).then((res) => {
            res.text().then((res: any) => {
                const result = JSON.parse(res);
                const unique = removeDuplicates(result.items);
                setBookmarks(unique);
            });
        });
    }, []);

    return (
        <View style={{ backgroundColor: '#111', height: '100%' }}>
            <ScrollView style={{ height: '100%' }}>
                <View>
                    <AutoHeightImage width={Dimensions.get('window').width} source={{ uri: 'https://cover.imglib.info/uploads/up-cover.jpg' }} />
                </View>
                <View style={{ backgroundColor: '#141414' }}>
                    <SafeView style={{ display: 'flex', flexDirection: 'row', paddingVertical: 6 }}>
                        <Avatar avatar={profile.avatar} url={`https://cover.imglib.info/uploads/users/${profile.id}/${profile.avatar}`} />
                        <View style={{ marginVertical: 6 }}>
                            <Text style={{ color: '#ddd', fontWeight: '600', fontSize: 16 }}>{profile.value ? profile.value : profile.username}</Text>
                        </View>
                    </SafeView>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <SafeView style={{ marginVertical: 12, display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity>
                            <Text style={{ color: '#ddd' }}>
                                Все <Text style={{ color: '#868e96', fontSize: 11 }}>{bookmarks?.length}</Text>
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
                </ScrollView>
                <View>
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
                </View>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;
