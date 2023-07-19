import { StyleSheet } from 'react-native';

export const AppTheme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    textInput: {
        width: '95%',
        backgroundColor: '#fff',
        marginHorizontal: 18,
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginTop: 18,
        fontWeight: '500',
    },
    resultList: {
        marginHorizontal: 12,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 100,
    },
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textWhite: {
        color: '#ddd',
    },
    textDarken: {
        color: '#aaa',
    },
});
