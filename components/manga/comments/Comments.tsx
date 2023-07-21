import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { IComment } from '../../../types/IComment';
import SafeView from '../../childs/SafeView';
import Comment from './Comment';

type Props = {
    id: number;
};

const Comments: React.FC<Props> = ({ id }) => {
    const [comments, setComments] = useState<IComment[] | any>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        fetchComments(currentPage);
    }, [currentPage]);

    const fetchComments = (pageNumber: number) => {
        fetch(`https://mangalib.me/api/v2/comments?type=manga&post_id=${id}&order=latest&page=${pageNumber}`)
            .then((res) => res.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (comments == null) {
                    setComments(response.comments);
                    return;
                }
                console.log(`Rendering page ${currentPage}`);
                setComments((prevComments: any) => [...prevComments, ...response.comments]);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    };

    const renderComment = ({ item }: { item: IComment }) => {
        return <Comment comment={item} />;
    };

    const loadMoreComments = () => {
        setCurrentPage((prev) => prev + 1);
    };

    return (
        <SafeView style={{ paddingBottom: 80 }}>
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
    );
};

export default Comments;
