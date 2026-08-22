import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Comment} from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';

interface CommentItemProps {
  comment: Comment;
  onPress?: () => void;
  onReply?: () => void;
  onLike?: () => void;
}

const CommentItem = ({comment, onPress, onReply, onLike}: CommentItemProps) => {
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
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={onPress ? 0.9 : 1}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {comment.author_username?.charAt(0).toUpperCase() || 'U'}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.username}>@{comment.author_username}</Text>
          <Text style={styles.timestamp}>{formatDate(comment.created_at)}</Text>
        </View>
        <Text style={styles.text}>{comment.content}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={onLike}>
            <Icon name="heart-outline" size={16} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onReply}>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
  },
  text: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
    paddingVertical: 2,
  },
  replyText: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '500',
  },
});

export default CommentItem;
