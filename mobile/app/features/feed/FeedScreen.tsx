import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {PostCard} from '../components/PostCard';
import {PostComposer} from '../components/PostComposer';
import {api} from '../../services/api';
import {FeedItem, User} from '../../types';
import {storage} from '../../utils/storage';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons';

const fetchFeed = async (): Promise<FeedItem[]> => {
  const response = await api.get('/feed');
  return response.data.data?.items || [];
};

const createPost = async (content: string, visibility: string): Promise<any> => {
  const response = await api.post('/posts', {content, visibility});
  return response.data.data;
};

const FeedScreen = () => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await storage.getUserData<User>();
    setUser(userData);
  };

  const {data: feedItems = [], isLoading, refetch, isRefetching} = useQuery({
    queryKey: ['feed'],
    queryFn: fetchFeed,
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['feed']});
    },
  });

  const handleCreatePost = async (content: string, visibility: string) => {
    try {
      await createPostMutation.mutateAsync(content, visibility);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const renderPost = ({item}: {item: FeedItem}) => (
    <PostCard item={item} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Feed</Text>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={feedItems}
        renderItem={renderPost}
        keyExtractor={item => item.post_id}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#6366f1"
            colors={['#6366f1']}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="newspaper-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>No posts yet</Text>
            <Text style={styles.emptySubtext}>Be the first to share something!</Text>
          </View>
        }
      />
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
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  listContent: {
    paddingVertical: 8,
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
});

export default FeedScreen;
