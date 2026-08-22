import { useState } from 'react'
import { useFeed, useCreatePost } from './useFeed'
import type { Post } from '../../types'

export function FeedPage() {
  const [limit] = useState(20)
  const [cursor, setCursor] = useState<string | undefined>()
  const { data, isLoading, error } = useFeed(limit, cursor)
  const createPost = useCreatePost()
  const [draft, setDraft] = useState('')

  const handlePublish = async () => {
    if (!draft.trim()) return
    await createPost.mutateAsync(draft.trim())
    setDraft('')
  }

  const posts = (data as any)?.data?.data || []
  const pagination = (data as any)?.data?.pagination || {}

  return (
    <div className="page-feed">
      <section className="composer">
        <div className="avatar">SR</div>
        <div className="composer-body">
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="What are you thinking about?" rows={2} />
          <div className="composer-tools">
            <button className="publish-button" disabled={!draft.trim()} onClick={handlePublish}>Publish</button>
          </div>
        </div>
      </section>
      {isLoading && <div className="loading">Loading feed...</div>}
      {error && <div className="error">Failed to load feed</div>}
      <div className="feed-list">
        {posts.map((post: Post) => (
          <article key={post.post_id} className="post-card">
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
        ))}
      </div>
      {pagination.has_next && (
        <button onClick={() => setCursor(pagination.next_cursor || undefined)}>Load more</button>
      )}
    </div>
  )
}
