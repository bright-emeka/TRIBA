import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>TRIBA</h1>
        <p>Reset your password</p>
        {sent ? (
          <p className="success-message">If an account exists, you will receive a password reset email.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Send reset link</button>
          </form>
        )}
        <p><Link to="/login">Back to login</Link></p>
      </div>
    </div>
  )
}
