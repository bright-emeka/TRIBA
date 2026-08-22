export interface User {
  uid: string
  email: string
  username: string
  display_name: string
  role: 'user' | 'admin'
  is_suspended: boolean
  avatar_url?: string
  bio?: string
  created_at?: string
  updated_at?: string
}

export interface Post {
  post_id: string
  author_id: string
  content: string
  visibility: 'public' | 'followers_only' | 'private'
  likes_count: number
  comments_count: number
  created_at: string
  updated_at: string
  author?: User
}

export interface Comment {
  comment_id: string
  post_id: string
  author_id: string
  content: string
  created_at: string
  updated_at: string
  author?: User
}

export interface Like {
  like_id: string
  user_id: string
  post_id: string
  created_at: string
}

export interface Follow {
  follower_id: string
  following_id: string
  created_at: string
}

export interface Notification {
  notification_id: string
  recipient_id: string
  actor_id: string
  type: 'follow' | 'like' | 'comment' | 'mention' | 'system'
  post_id?: string
  comment_id?: string
  message: string
  is_read: boolean
  created_at: string
  actor?: User
}

export interface ActivityEvent {
  event_id: string
  user_id: string
  event_type: string
  target_type?: string
  target_id?: string
  metadata: Record<string, any>
  created_at: string
}

export interface UserStats {
  user_id: string
  posts_created_today: number
  posts_created_week: number
  posts_created_month: number
  likes_given_today: number
  likes_given_week: number
  comments_given_week: number
  followers_gained_week: number
  following_count: number
  profile_views_week: number
}

export interface PlatformStats {
  total_users: number
  total_posts: number
  total_comments: number
  total_likes: number
  daily_active_users: number
}

export interface Trend {
  trend_id: string
  topic: string
  score: number
  post_count: number
}

export interface AIMessage {
  message_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface Report {
  report_id: string
  reporter_id: string
  target_type: 'post' | 'comment' | 'user'
  target_id: string
  reason: string
  status: 'pending' | 'resolved' | 'dismissed'
  created_at: string
}

export interface AdminAuditLog {
  log_id: string
  admin_id: string
  action: string
  target_type: string
  target_id: string
  reason?: string
  created_at: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error_code?: string
  message?: string
}
