import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {FeedItem} from '../../../types';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

interface PostCardProps {
  item: FeedItem;
}

const PostCard = ({item}: PostCardProps) => {
  const handleLike = () => {
    Alert.alert('Like', 'Like functionality coming soon');
  };

  const handleComment = () => {
    Alert.alert('Comment', 'Comment functionality coming soon');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share functionality coming soon');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.author_username?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.username}>@{item.author_username}</Text>
          <Text style={styles.timestamp}>{formatDate(item.created_at)}</Text>
        </View>
      </View>

      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Icon name="heart-outline" size={20} color="#6b7280" />
          <Text style={styles.actionText}>{item.likes_count}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
          <Icon name="chatbubble-outline" size={20} color="#6b7280" />
          <Text style={styles.actionText}>{item.comments_count}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Icon name="arrow-redo-outline" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
  },
  username: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  content: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default PostCard;
