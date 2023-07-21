import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { IComment } from '../../../types/IComment';
import { getTimeAgo } from '../../../utils/comments/FormatDate';
import { useNavigation } from '@react-navigation/native';

type Props = {
    comment: IComment;
};

const Comment: React.FC<Props> = ({ comment }) => {
    const navigation: any = useNavigation();
    const rating = comment.votes_up - comment.votes_down;
    const ratingColor = (rating: number) => {
        if (rating > 0) {
            return '#3cce7b';
        }
        if (rating < 0) {
            return '#f44336';
        } else {
            return '#818181';
        }
    };
    return (
        <View>
            <View style={{ marginTop: 16 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Profile', { userData: comment.user });
                        }}
                    >
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            {comment.user.avatar != '0' ? (
                                <Image
                                    source={{ uri: `https://mangalib.me/uploads/users/${comment.user.id}/${comment.user.avatar}` }}
                                    style={{ height: 36, width: 36, resizeMode: 'cover' }}
                                />
                            ) : (
                                <Image
                                    source={{ uri: `https://mangalib.me/uploads/users/placeholder.png` }}
                                    style={{ height: 36, width: 36, resizeMode: 'cover' }}
                                />
                            )}
                            <View style={{ marginLeft: 12 }}>
                                <Text style={{ color: '#ddd', fontWeight: '500' }}>{comment.user.username}</Text>

                                <Text style={{ color: '#aaa', marginTop: 3 }}>{getTimeAgo(comment.created_at)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: ratingColor(rating), fontWeight: '500', fontSize: 16 }}>{rating}</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 12, color: '#ddd' }}>
                    {comment.comment
                        .replaceAll(/<(?!br\s*\/?)[^>]+>/gi, '')
                        .replaceAll('<br>', '\n')
                        .trim()}
                </Text>
            </View>
        </View>
    );
};

export default Comment;
