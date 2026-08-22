import { useState } from 'react'
import { useComments, useCreateComment } from './useComments'

export function CommentSection({ postId }: { postId: string }) {
  const [content, setContent] = useState('')
  const { data, isLoading } = useComments(postId)
  const createComment = useCreateComment(postId)

  const handleSubmit = async () => {
    if (!content.trim()) return
    await createComment.mutateAsync(content.trim())
    setContent('')
  }

  return (
    <div className="comment-section">
      <div className="comment-form">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Add a comment..." rows={2} />
        <button onClick={handleSubmit} disabled={!content.trim()}>Comment</button>
      </div>
      {isLoading && <div className="loading">Loading comments...</div>}
      <div className="comment-list">
        {data?.data?.map((comment: any) => (
          <div key={comment.comment_id} className="comment">
            <p>{comment.content}</p>
            <span>{new Date(comment.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
