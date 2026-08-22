export type UserRole = 'user' | 'admin';
export type PostVisibility = 'public' | 'followers_only' | 'private';
export type NotificationType = 'follow' | 'like' | 'comment' | 'mention' | 'system';
export type ActivityEventType = 'post_created' | 'post_deleted' | 'comment_created' | 'like_added' | 'like_removed' | 'follow_added' | 'follow_removed' | 'profile_updated' | 'user_registered';
export type ReportStatus = 'pending' | 'resolved' | 'dismissed';

export interface User {
  uid: string;
  email: string;
  username: string;
  display_name: string;
  role: UserRole;
  is_suspended: boolean;
  followers_count: number;
  following_count: number;
  posts_count: number;
  last_active_at: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  post_id: string;
  author_id: string;
  content: string;
  visibility: PostVisibility;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface FeedItem {
  post_id: string;
  author_id: string;
  author_username: string;
  content: string;
  visibility: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

export interface FeedResponse {
  items: FeedItem[];
  next_cursor: string | null;
  has_more: boolean;
}

export interface Comment {
  comment_id: string;
  post_id: string;
  author_id: string;
  author_username: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Like {
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Follow {
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Notification {
  notification_id: string;
  recipient_id: string;
  actor_id: string;
  actor_username: string;
  type: NotificationType;
  entity_id: string;
  entity_type: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface ActivityEvent {
  event_id: string;
  user_id: string;
  event_type: ActivityEventType;
  target_type: string;
  target_id: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface UserStats {
  total_users: number;
  total_posts: number;
  total_comments: number;
  total_likes: number;
  total_follows: number;
  active_users_today: number;
  new_users_today: number;
  new_posts_today: number;
}

export interface PlatformStats {
  total_users: number;
  total_posts: number;
  total_comments: number;
  total_likes: number;
  total_follows: number;
  active_users_today: number;
  new_users_today: number;
  new_posts_today: number;
}

export interface Trend {
  topic_id: string;
  name: string;
  post_count: number;
  score: number;
  created_at: string;
}

export interface TrendingPost {
  post_id: string;
  author_id: string;
  content: string;
  likes_count: number;
  comments_count: number;
  score: number;
}

export interface AIMessage {
  role: string;
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  conversation_id?: string;
}

export interface ChatResponse {
  response: string;
  conversation_id: string;
  tools_used?: string[];
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export interface Report {
  report_id: string;
  reporter_id: string;
  target_type: string;
  target_id: string;
  reason: string;
  status: ReportStatus;
  created_at: string;
}

export interface AdminAuditLog {
  log_id: string;
  actor_id: string;
  actor_username: string;
  action: string;
  target_type: string;
  target_id: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error_code?: string;
  message?: string;
}

export interface Profile {
  user_id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  location: string;
  website: string;
  visibility: string;
}
