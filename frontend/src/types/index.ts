export interface User {
  id: string
  email: string
  username: string
  displayName: string
  bio?: string
  avatarUrl?: string
  role: 'user' | 'moderator' | 'admin'
  isVerified: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  stats: {
    posts: number
    followers: number
    following: number
  }
}

export interface Post {
  id: string
  authorId: string
  author: Pick<User, 'id' | 'username' | 'displayName' | 'avatarUrl'>
  content: string
  mediaUrls?: string[]
  tags: string[]
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  author: Pick<User, 'id' | 'username' | 'displayName' | 'avatarUrl'>
  content: string
  parentId?: string
  likes: number
  isLiked: boolean
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  userId: string
  type: 'like' | 'comment' | 'follow' | 'mention' | 'system'
  actor?: Pick<User, 'id' | 'username' | 'displayName' | 'avatarUrl'>
  postId?: string
  commentId?: string
  message: string
  read: boolean
  createdAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export interface Report {
  id: string
  reporterId: string
  reporter: Pick<User, 'id' | 'username' | 'displayName'>
  targetType: 'post' | 'comment' | 'user'
  targetId: string
  reason: string
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
  reviewedBy?: string
  reviewNotes?: string
  createdAt: string
  updatedAt: string
}

export interface AuditLog {
  id: string
  actorId: string
  actor: Pick<User, 'id' | 'username' | 'displayName'>
  action: string
  entityType: string
  entityId: string
  details?: Record<string, unknown>
  ipAddress?: string
  createdAt: string
}

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalPosts: number
  totalComments: number
  totalReports: number
  newUsersToday: number
  newPostsToday: number
  postsPerHour: { hour: string; count: number }[]
  topTags: { tag: string; count: number }[]
  userGrowth: { date: string; count: number }[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  username: string
  displayName: string
  password: string
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

export interface CreatePostDto {
  content: string
  tags?: string[]
  mediaUrls?: string[]
}

export interface UpdatePostDto {
  content?: string
  tags?: string[]
  mediaUrls?: string[]
}

export interface CreateCommentDto {
  content: string
  parentId?: string
}

export interface UpdateProfileDto {
  displayName?: string
  bio?: string
  avatarUrl?: string
}

export interface AdminUserUpdateDto {
  role?: 'user' | 'moderator' | 'admin'
  isActive?: boolean
  isVerified?: boolean
}

export interface PaginationParams {
  page: number
  pageSize: number
  search?: string
}

export interface FiltersParams {
  startDate?: string
  endDate?: string
  status?: string
  role?: string
}
