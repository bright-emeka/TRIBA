import type { Post } from '../../types'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <div className="post-header">
        <div className="avatar">{post.author_id?.[0]?.toUpperCase() || '?'}</div>
        <div>
          <strong>{post.author_id}</strong>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <p>{post.content}</p>
      <div className="post-actions">
        <button>Like ({post.likes_count})</button>
        <button>Comment ({post.comments_count})</button>
      </div>
    </article>
  )
}
