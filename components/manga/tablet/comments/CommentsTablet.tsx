import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { IComment } from '../../../../types/IComment';
import SafeView from '../../../childs/SafeView';
import CommentTablet from './CommentTablet';

type Props = {
    id: number;
};

const CommentsTablet: React.FC<Props> = ({ id }) => {
    const [comments, setComments] = useState<IComment[] | any>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [order, setOrder] = useState<string>('latest');

    useEffect(() => {
        fetchComments(currentPage);
    }, [currentPage]);

    const fetchComments = (pageNumber: number) => {
        fetch(`https://mangalib.me/api/v2/comments?type=manga&post_id=${id}&order=${order}&page=${pageNumber}`)
            .then((res) => res.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (comments == null) {
                    setComments(response.comments);
                    return;
                }
                setComments((prevComments: any) => [...prevComments, ...response.comments]);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    };

    const renderComment = ({ item }: { item: IComment }) => {
        return <CommentTablet comment={item} />;
    };

    const loadMoreComments = () => {
        setCurrentPage((prev) => prev + 1);
    };

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            {/* <TouchableOpacity
                onPress={() => {
                    setOrder('best');
                    setComments(null);
                    setCurrentPage(1);
                }}
                style={{ backgroundColor: '#7474810d', paddingHorizontal: 7, paddingVertical: 6, borderRadius: 3 }}
            >
                <Text style={{ color: '#ddd' }}>Популярные</Text>
            </TouchableOpacity> */}
            <SafeView style={{ paddingBottom: 80, maxWidth: 960 }}>
                {comments ? (
                    <FlatList
                        data={comments}
                        renderItem={renderComment}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        onEndReached={loadMoreComments}
                        onEndReachedThreshold={0.2}
                    />
                ) : (
                    <View style={{ marginVertical: '40%' }}>
                        <ActivityIndicator />
                        <Text style={{ color: '#ddd', fontWeight: '500', textAlign: 'center', marginTop: 16 }}>Загружаем комментарии...</Text>
                    </View>
                )}
            </SafeView>
        </View>
    );
};

export default CommentsTablet;
