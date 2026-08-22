# TRIBA REST API Documentation

## Base URL
```
/api/v1
```

## Authentication
All protected endpoints require a Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase_id_token>
```

## Response Format

Success:
```json
{
  "success": true,
  "data": { ... }
}
```

Error:
```json
{
  "success": false,
  "error_code": "ERROR_CODE",
  "message": "Error description"
}
```

## Endpoints

### Auth
- `GET /auth/me` - Get current user
- `POST /auth/sync` - Sync Firebase user

### Users
- `GET /users/search?q=` - Search users
- `GET /users/{username}` - Get user profile
- `PATCH /users/me` - Update current user

### Profiles
- `GET /profiles/{username}` - Get profile
- `PATCH /profiles/{username}` - Update profile
- `POST /profiles/avatar` - Upload avatar

### Posts
- `POST /posts` - Create post
- `GET /posts/{post_id}` - Get post
- `PATCH /posts/{post_id}` - Update post
- `DELETE /posts/{post_id}` - Delete post

### Comments
- `POST /posts/{post_id}/comments` - Create comment
- `GET /posts/{post_id}/comments` - List comments
- `PATCH /comments/{comment_id}` - Update comment
- `DELETE /comments/{comment_id}` - Delete comment

### Likes
- `POST /posts/{post_id}/like` - Like post
- `DELETE /posts/{post_id}/like` - Unlike post

### Follows
- `POST /users/{user_id}/follow` - Follow user
- `DELETE /users/{user_id}/follow` - Unfollow user
- `GET /users/{user_id}/followers` - List followers
- `GET /users/{user_id}/following` - List following

### Feed
- `GET /feed?limit=20&cursor=` - Get feed

### Search
- `GET /search/users?q=` - Search users

### Notifications
- `GET /notifications` - Get notifications
- `PATCH /notifications/{id}/read` - Mark as read
- `PATCH /notifications/read-all` - Mark all as read

### Activity
- `GET /activity/me` - Get user activity
- `GET /activity/me/summary` - Get activity summary

### Analytics
- `GET /analytics/me/stats` - Get user stats
- `GET /analytics/platform/stats` - Get platform stats (admin)

### Trends
- `GET /trends/topics` - Get trending topics
- `GET /trends/posts` - Get trending posts

### AI
- `POST /ai/chat` - Send message to AI
- `GET /ai/history` - Get chat history
- `DELETE /ai/history` - Clear history

### Admin
- `GET /admin/dashboard` - Dashboard stats
- `GET /admin/users` - List users
- `GET /admin/users/{id}` - Get user
- `PATCH /admin/users/{id}` - Update user
- `POST /admin/users/{id}/suspend` - Suspend user
- `POST /admin/users/{id}/restore` - Restore user
- `GET /admin/posts` - List posts
- `DELETE /admin/posts/{id}` - Delete post
- `GET /admin/comments` - List comments
- `DELETE /admin/comments/{id}` - Delete comment
- `GET /admin/audit-logs` - List audit logs
