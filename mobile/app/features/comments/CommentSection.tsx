import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {Comment} from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
  isLoading?: boolean;
}

const CommentSection = ({comments, onAddComment, isLoading}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    await onAddComment(newComment.trim());
    setNewComment('');
  };

  const renderComment = ({item}: {item: Comment}) => (
    <View style={styles.commentItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.author_username?.charAt(0).toUpperCase() || 'U'}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>@{item.author_username}</Text>
        <Text style={styles.text}>{item.content}</Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.comment_id}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No comments yet</Text>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor="#9ca3af"
          value={newComment}
          onChangeText={setNewComment}
          multiline
          maxLength={300}
        />
        <TouchableOpacity
          style={[styles.submitButton, !newComment.trim() && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!newComment.trim() || isLoading}>
          <Icon name="send" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  list: {
    flex: 1,
    paddingVertical: 8,
  },
  commentItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  username: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  date: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 32,
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
    color: '#111827',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
});

export default CommentSection;
