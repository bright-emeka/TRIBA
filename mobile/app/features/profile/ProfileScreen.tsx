import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {api} from '../../services/api';
import {Post, User, Follow} from '../../types';
import {storage} from '../../utils/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  const response = await api.get(`/users/${userId}/posts`);
  return response.data.data || [];
};

const fetchUser = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data.data as User;
};

const followUser = async (userId: string): Promise<void> => {
  await api.post(`/users/${userId}/follow`);
};

const unfollowUser = async (userId: string): Promise<void> => {
  await api.delete(`/users/${userId}/follow`);
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profileUserId, setProfileUserId] = useState<string | null>(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    const userData = await storage.getUserData<User>();
    setCurrentUser(userData);
    setProfileUserId(userData?.uid);
  };

  const {data: user, isLoading: userLoading} = useQuery({
    queryKey: ['user', profileUserId],
    queryFn: () => fetchUser(profileUserId!),
    enabled: !!profileUserId,
  });

  const {data: posts = [], isLoading: postsLoading} = useQuery({
    queryKey: ['userPosts', profileUserId],
    queryFn: () => fetchUserPosts(profileUserId!),
    enabled: !!profileUserId,
  });

  const followMutation = useMutation({
    mutationFn: profileUserId ? followUser : () => Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user', profileUserId]});
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: profileUserId ? unfollowUser : () => Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user', profileUserId]});
    },
  });

  const isOwnProfile = currentUser?.uid === profileUserId;

  const handleFollow = async () => {
    if (!profileUserId) return;
    try {
      if (user?.is_following) {
        await unfollowMutation.mutateAsync(profileUserId);
      } else {
        await followMutation.mutateAsync(profileUserId);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update follow status');
    }
  };

  const renderPost = ({item}: {item: Post}) => (
    <View style={styles.postCard}>
      <Text style={styles.postContent} numberOfLines={3}>
        {item.content}
      </Text>
      <View style={styles.postStats}>
        <Text style={styles.statText}>{item.likes_count} likes</Text>
        <Text style={styles.statText}>{item.comments_count} comments</Text>
      </View>
    </View>
  );

  if (userLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user?.avatar_url ? (
            <Image source={{uri: user.avatar_url}} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.display_name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.displayName}>{user?.display_name || 'User'}</Text>
        <Text style={styles.username}>@{user?.username}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user?.posts_count || 0}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user?.followers_count || 0}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user?.following_count || 0}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {!isOwnProfile && (
          <TouchableOpacity
            style={[
              styles.followButton,
              user?.is_following && styles.followingButton,
            ]}
            onPress={handleFollow}>
            <Text
              style={[
                styles.followButtonText,
                user?.is_following && styles.followingButtonText,
              ]}>
              {user?.is_following ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}

        {isOwnProfile && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile' as never)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.post_id}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} tintColor="#6366f1" />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="document-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>No posts yet</Text>
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
  },
  header: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
  },
  displayName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followingButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  followingButtonText: {
    color: '#6366f1',
  },
  editButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 24,
  },
  editButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingVertical: 8,
  },
  postCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 16,
  },
  postContent: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 8,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
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
});

export default ProfileScreen;
