import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppTheme } from '../styles/AppTheme';
import { ITitle } from '../types/ITitle';
import { ListView } from '../styles/ListView';
import { useNavigation } from '@react-navigation/native';

export const MainScreen: React.FC = () => {
    const navigation: any = useNavigation();

    const [search, setSearch] = useState<string>('');
    const [result, setResult] = useState<ITitle[] | null>(null);
    const [pending, setPending] = useState<Boolean>(false);

    // Debounce start; ignore it
    const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
        let timer: NodeJS.Timeout;
        return function (this: any, ...args: Parameters<F>) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const delayedSetSearch = debounce(setSearch, 500);

    const handleSearchChange = (text: string) => {
        delayedSetSearch(text);
    };
    // Debounce end

    // Do searches on website when search is changed
    useEffect(() => {
        if (search != '') {
            setResult(null);
            setPending(true);
            fetch(`https://mangalib.me/search?type=manga&q=${search}`).then((res) => {
                res.text().then((res) => {
                    const response = JSON.parse(res);
                    setResult(response);
                    setPending(false);
                });
            });
        }
    }, [search]);

    const handleClick = (item: any) => {
        navigation.navigate('MangaDetails', {
            details: item,
        });
    };

    return (
        <SafeAreaView style={AppTheme.container}>
            <View>
                <View style={{ ...AppTheme.center, marginBottom: 12 }}>
                    <TextInput placeholder='Поиск' onChangeText={handleSearchChange} style={AppTheme.textInput} />
                </View>
                {result && pending == false ? (
                    <ScrollView>
                        <View style={AppTheme.resultList}>
                            {result.map((item: ITitle, index: number) => {
                                return (
                                    <TouchableOpacity
                                        style={ListView.item}
                                        onPress={() => {
                                            handleClick(item);
                                        }}
                                    >
                                        <View key={index} style={ListView.content}>
                                            <Image source={{ uri: item.coverImage }} style={ListView.image} />
                                            <View>
                                                <Text style={{ color: 'white', fontWeight: '600' }}>{item.name}</Text>
                                                <Text style={ListView.ru_name}>{item.rus_name}</Text>
                                                <View style={ListView.additionalInfo}>
                                                    <Text style={{ fontWeight: '500', color: 'white' }}>Количество глав: {item.chap_count}</Text>
                                                    <Text style={{ fontWeight: '500', color: 'white' }}>
                                                        <Image source={require('../assets/app/star.png')} style={{ width: 12, height: 12 }} />
                                                        {` ${item.rate_avg}`}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={{ flex: 1, marginVertical: '80%' }}>
                        <ActivityIndicator />
                        <Text style={{ color: '#aaa', fontWeight: '500', fontSize: 14, height: 18, textAlign: 'center', marginTop: 22 }}>
                            Ищем...
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};
