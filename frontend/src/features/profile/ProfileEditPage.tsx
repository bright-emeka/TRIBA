import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProfile, useUpdateProfile } from './useProfile'

export function ProfileEditPage() {
  const { username } = useParams<{ username: string }>()
  const { data } = useProfile(username || '')
  const updateProfile = useUpdateProfile()
  const profile = (data as any)?.data || {}
  const [bio, setBio] = useState(profile.bio || '')

  const handleSubmit = async () => {
    if (!username) return
    await updateProfile.mutateAsync({ username, data: { bio } })
  }

  return (
    <div className="page-profile-edit">
      <h1>Edit Profile</h1>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
      <button onClick={handleSubmit}>Save changes</button>
    </div>
  )
}
