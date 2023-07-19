import { StyleSheet } from 'react-native';

export const ListView = StyleSheet.create({
    item: {
        width: '75%',
        marginVertical: 6,
    },
    image: {
        width: 70,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 6,
        marginRight: 12,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
    },
    ru_name: {
        color: 'gray',
        fontWeight: '500',
    },
    additionalInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 3,
    },
});
