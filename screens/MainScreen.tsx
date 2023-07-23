import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { AppTheme } from '../styles/AppTheme';
import { ITitle } from '../types/ITitle';
import { ListView } from '../styles/ListView';
import { useNavigation } from '@react-navigation/native';
import SearchSwitcher from '../components/search/SearchSwitcher';
import RenderUsers from '../components/search/RenderUsers';
import SafeView from '../components/childs/SafeView';
import { isTablet } from '../other/constants';

export const MainScreen: React.FC = () => {
    const navigation: any = useNavigation();

    const [search, setSearch] = useState<string>('');
    const [result, setResult] = useState<ITitle[] | null>(null);
    const [pending, setPending] = useState<Boolean>(false);
    const [searchType, setSearchType] = useState<string>('manga');

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
            fetch(`https://mangalib.me/search?type=${searchType}&q=${search}`).then((res) => {
                res.text().then((res) => {
                    const response = JSON.parse(res);
                    setResult(response);
                    setPending(false);
                });
            });
        }
    }, [search, searchType]);

    const handleClick = (item: any) => {
        if (isTablet) {
            navigation.navigate('MangaDetailsTablet', { details: item });
            return;
        }
        navigation.navigate('MangaDetails', {
            details: item,
        });
    };

    useEffect(() => {
        setResult(null);
    }, [searchType]);

    const MainScreenRenderer = () => {
        if (result && pending == false && searchType == 'manga') {
            return (
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
            );
        } else if (result && pending == false && searchType == 'user') {
            return <RenderUsers result={result} />;
        } else if (search == '') {
            return (
                <View style={{ marginVertical: '80%' }}>
                    <Text style={{ color: '#ddd', fontWeight: '600', fontSize: 14, height: 18, textAlign: 'center' }}>
                        Давайте что нибудь поищем?
                    </Text>
                    <Text style={{ color: '#ddd', fontWeight: '600', fontSize: 14, height: 18, textAlign: 'center' }}>
                        Напишите что-то в поисковой строке.
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, marginVertical: '80%' }}>
                    <ActivityIndicator />
                    <Text style={{ color: '#aaa', fontWeight: '500', fontSize: 14, height: 18, textAlign: 'center', marginTop: 22 }}>Ищем...</Text>
                </View>
            );
        }
    };

    return (
        <SafeAreaView style={AppTheme.container}>
            <View>
                <View style={{ ...AppTheme.center }}>
                    <TextInput placeholder='Поиск' onChangeText={handleSearchChange} style={AppTheme.textInput} />
                </View>
                <SafeView>
                    <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', gap: 6, marginBottom: 12 }}>
                        <TouchableOpacity onPress={() => setSearchType('manga')}>
                            <SearchSwitcher current={searchType} desired='manga'>
                                Манга
                            </SearchSwitcher>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSearchType('user')}>
                            <SearchSwitcher current={searchType} desired='user'>
                                Пользователь
                            </SearchSwitcher>
                        </TouchableOpacity>
                    </View>
                </SafeView>
                {MainScreenRenderer()}
            </View>
        </SafeAreaView>
    );
};
