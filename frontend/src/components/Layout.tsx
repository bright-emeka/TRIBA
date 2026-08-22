import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">T</span>
          <span>TRIBA</span>
          <small>/ social intelligence</small>
        </div>
        <nav className="top-actions">
          <span>Notifications</span>
        </nav>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <SidebarNav />
        </aside>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SidebarNav() {
  const links = [
    { to: '/feed', label: 'For you', icon: 'Home' },
    { to: '/search', label: 'Explore', icon: 'Compass' },
    { to: '/notifications', label: 'Notifications', icon: 'Bell' },
    { to: '/chat', label: 'AI Chat', icon: 'Bot' },
  ]

  return (
    <>
      <div className="eyebrow">Workspace</div>
      <nav>
        {links.map((link) => (
          <a key={link.to} href={link.to} className="nav-item">
            {link.label}
          </a>
        ))}
      </nav>
      <div className="sidebar-divider" />
      <div className="eyebrow">Account</div>
      <nav>
        <a href="/settings" className="nav-item">Settings</a>
      </nav>
    </>
  )
}
