import { useState } from 'react'
import { useCreatePost } from './useFeed'

export function PostComposer({ onPublished }: { onPublished?: () => void }) {
  const [content, setContent] = useState('')
  const createPost = useCreatePost()

  const handleSubmit = async () => {
    if (!content.trim()) return
    await createPost.mutateAsync(content.trim())
    setContent('')
    onPublished?.()
  }

  return (
    <div className="composer">
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What are you thinking about?" rows={2} />
      <button onClick={handleSubmit} disabled={!content.trim()}>Publish</button>
    </div>
  )
}
