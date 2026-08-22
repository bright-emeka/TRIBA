import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export function SettingsPage() {
  const [tab, setTab] = useState<'account' | 'privacy' | 'security'>('account')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="page-settings">
      <h1>Settings</h1>
      <div className="settings-tabs">
        <button onClick={() => setTab('account')} className={tab === 'account' ? 'active' : ''}>Account</button>
        <button onClick={() => setTab('privacy')} className={tab === 'privacy' ? 'active' : ''}>Privacy</button>
        <button onClick={() => setTab('security')} className={tab === 'security' ? 'active' : ''}>Security</button>
      </div>
      <div className="settings-content">
        {tab === 'account' && (
          <div>
            <p>Email: {user?.email}</p>
            <p>Username: {user?.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {tab === 'privacy' && (
          <div>
            <p>Profile visibility: Public</p>
          </div>
        )}
        {tab === 'security' && (
          <div>
            <p>Password settings</p>
          </div>
        )}
      </div>
    </div>
  )
}
