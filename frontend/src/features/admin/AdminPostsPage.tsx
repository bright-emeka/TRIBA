import { useAdminPosts } from './useAdmin'

export function AdminPostsPage() {
  const { data, isLoading } = useAdminPosts()
  const posts = (data as any)?.data || []

  return (
    <div className="admin-page">
      <h1>Posts</h1>
      {isLoading && <div className="loading">Loading...</div>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Content</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => (
            <tr key={post.post_id}>
              <td>{post.post_id}</td>
              <td>{post.author_id}</td>
              <td>{post.content?.slice(0, 50)}...</td>
              <td>{new Date(post.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
