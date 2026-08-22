import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import {api} from '../../services/api';
import {Comment, Post} from '../../types';
import {storage} from '../../utils/storage';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {sanitizeInput, isValidComment} from '../../utils/validation';
import Icon from 'react-native-vector-icons/Ionicons';

type PostDetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

const fetchPost = async (postId: string): Promise<Post> => {
  const response = await api.get(`/posts/${postId}`);
  return response.data.data as Post;
};

const fetchComments = async (postId: string): Promise<Comment[]> => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data.data || [];
};

const createComment = async (postId: string, content: string): Promise<Comment> => {
  const response = await api.post(`/posts/${postId}/comments`, {content});
  return response.data.data as Comment;
};

const PostDetailScreen = () => {
  const route = useRoute<PostDetailRouteProp>();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const {postId} = route.params;
  const [commentText, setCommentText] = useState('');

  const {data: post, isLoading: postLoading} = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });

  const {data: comments = [], isLoading: commentsLoading, refetch} = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  const createCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['comments', postId]});
      queryClient.invalidateQueries({queryKey: ['post', postId]});
      setCommentText('');
    },
  });

  const handleSubmitComment = async () => {
    const sanitized = sanitizeInput(commentText);
    if (!isValidComment(sanitized)) {
      Alert.alert('Error', 'Comment must be 1-300 characters');
      return;
    }

    try {
      await createCommentMutation.mutateAsync(sanitized);
    } catch (error) {
      Alert.alert('Error', 'Failed to post comment');
    }
  };

  const renderComment = ({item}: {item: Comment}) => (
    <View style={styles.commentItem}>
      <View style={styles.commentAvatar}>
        <Text style={styles.commentAvatarText}>
          {item.author_username?.charAt(0).toUpperCase() || 'U'}
        </Text>
      </View>
      <View style={styles.commentContent}>
        <Text style={styles.commentUsername}>@{item.author_username}</Text>
        <Text style={styles.commentText}>{item.content}</Text>
        <Text style={styles.commentDate}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  if (postLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.comment_id}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetch} tintColor="#6366f1" />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="chatbubble-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>No comments yet</Text>
            <Text style={styles.emptySubtext}>Be the first to comment!</Text>
          </View>
        }
        ListHeaderComponent={
          post ? (
            <View style={styles.postHeader}>
              <Text style={styles.postContent}>{post.content}</Text>
              <View style={styles.postStats}>
                <Text style={styles.statText}>
                  {post.likes_count} likes
                </Text>
                <Text style={styles.statText}>
                  {post.comments_count} comments
                </Text>
              </View>
            </View>
          ) : null
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor="#9ca3af"
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !commentText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSubmitComment}
            disabled={!commentText.trim()}>
            <Icon
              name="send"
              size={20}
              color={commentText.trim() ? '#6366f1' : '#9ca3af'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: 8,
  },
  postHeader: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  postContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  commentItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  commentAvatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  commentDate: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 15,
    color: '#111827',
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default PostDetailScreen;
