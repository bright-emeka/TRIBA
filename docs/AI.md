# TRIBA AI Context Architecture

## Overview

The TRIBA AI assistant uses Gemini to provide contextual answers about user activity, platform trends, and public social data. The AI never receives unrestricted database access.

## Context Construction

1. User sends a message
2. Intent is analyzed
3. Required data is selected
4. Permission checks are performed
5. Data is sanitized
6. Context is built
7. Gemini generates a response

## Privacy Boundary

- Private data is never exposed without explicit permission
- Public data is limited to what's necessary for the query
- The backend is the permission system, not the AI

## AI Tools

The AI can access application data through controlled tools:

- `get_my_activity()` - Current user's activity
- `get_my_stats()` - Current user's statistics
- `get_my_recent_posts()` - Current user's recent posts
- `get_user_profile(user_id)` - Public user profile
- `get_public_user_activity(user_id)` - Public user activity
- `get_public_user_posts(user_id)` - Public user posts
- `get_trending_topics()` - Platform trending topics
- `get_trending_posts()` - Platform trending posts
- `get_following_activity()` - Following list activity
- `search_users(query)` - Search users
- `get_post_context(post_id)` - Post context

## Information Classes

### Public
- Public profile
- Public posts
- Public metrics

### Private
- Private activity
- Private settings
- Protected data

### Internal
- Security metadata
- Moderation notes
- System configuration
