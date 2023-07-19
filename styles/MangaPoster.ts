import { StyleSheet } from 'react-native';

export const PosterTheme = StyleSheet.create({
    background: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 100,
    },
    poster: {
        width: '60%',
        height: 305,
        resizeMode: 'cover',
        borderRadius: 10,
    },
});
