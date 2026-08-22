import { useState } from 'react'
import { useSearchUsers } from './useSearch'
import { Link } from 'react-router-dom'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const { data, isLoading } = useSearchUsers(query)

  const users = (data as any)?.data || []

  return (
    <div className="page-search">
      <h1>Search</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users..." />
      {isLoading && <div className="loading">Searching...</div>}
      <div className="search-results">
        {users.map((user: any) => (
          <Link key={user.uid} to={`/profile/${user.username}`} className="search-result-item">
            <div className="avatar">{user.username?.[0]?.toUpperCase()}</div>
            <div>
              <strong>{user.display_name}</strong>
              <span>@{user.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
