import { useAdminUsers } from './useAdmin'

export function AdminUsersPage() {
  const { data, isLoading } = useAdminUsers()
  const users = data?.data || []

  return (
    <div className="admin-page">
      <h1>Users</h1>
      {isLoading && <div className="loading">Loading...</div>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.uid}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.is_suspended ? 'Suspended' : 'Active'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
