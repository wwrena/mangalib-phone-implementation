import React from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { AppTheme } from '../../styles/AppTheme';
import { ITitle } from '../../types/ITitle';
import { useNavigation } from '@react-navigation/native';

type Props = {
    result: ITitle[] | null;
};

const RenderUsers: React.FC<Props> = ({ result }) => {
    const navigation: any = useNavigation();
    return (
        <ScrollView>
            <View style={{ ...AppTheme.resultList }}>
                {result
                    ? result.map((item: any, index: number) => {
                          return (
                              <TouchableOpacity key={index} onPress={() => navigation.navigate('Profile', { userData: item })}>
                                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                                      {item.avatar != '0' ? (
                                          <Image
                                              source={{ uri: `https://cover.imglib.info/uploads/users/${item.id}/${item.avatar}` }}
                                              style={{
                                                  width: 30,
                                                  height: 30,
                                                  resizeMode: 'cover',
                                                  marginRight: 12,
                                                  borderRadius: 50,
                                              }}
                                          />
                                      ) : (
                                          <Image
                                              source={{ uri: `https://cover.imglib.info/uploads/users/placeholder.png` }}
                                              style={{
                                                  width: 30,
                                                  height: 30,
                                                  resizeMode: 'cover',
                                                  marginRight: 12,
                                                  borderRadius: 50,
                                              }}
                                          />
                                      )}
                                      <Text style={{ fontSize: 14, color: '#ddd' }}>{item.value}</Text>
                                  </View>
                              </TouchableOpacity>
                          );
                      })
                    : null}
            </View>
        </ScrollView>
    );
};

export default RenderUsers;
