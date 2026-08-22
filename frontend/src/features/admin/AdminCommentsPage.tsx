import { useAdminComments } from './useAdmin'

export function AdminCommentsPage() {
  const { data, isLoading } = useAdminComments()
  const comments = data?.data || []

  return (
    <div className="admin-page">
      <h1>Comments</h1>
      {isLoading && <div className="loading">Loading...</div>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Post</th>
            <th>Author</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment: any) => (
            <tr key={comment.comment_id}>
              <td>{comment.comment_id}</td>
              <td>{comment.post_id}</td>
              <td>{comment.author_id}</td>
              <td>{comment.content?.slice(0, 50)}...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
