import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProfile, useUpdateProfile } from './useProfile'

export function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const { data, isLoading, error } = useProfile(username || '')
  const updateProfile = useUpdateProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState('')

  const handleUpdate = async () => {
    if (!username) return
    await updateProfile.mutateAsync({ username, data: { bio } })
    setIsEditing(false)
  }

  if (isLoading) return <div className="loading">Loading profile...</div>
  if (error) return <div className="error">Failed to load profile</div>

  const profile = data?.data

  return (
    <div className="page-profile">
      <div className="profile-header">
        <div className="avatar large">{profile?.username?.[0]?.toUpperCase() || '?'}</div>
        <h1>{profile?.display_name}</h1>
        <p>@{profile?.username}</p>
        {profile?.bio && <p>{profile.bio}</p>}
        <button onClick={() => setIsEditing(!isEditing)}>Edit Profile</button>
      </div>
      {isEditing && (
        <div className="profile-edit">
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Update your bio" />
          <button onClick={handleUpdate}>Save</button>
        </div>
      )}
    </div>
  )
}
