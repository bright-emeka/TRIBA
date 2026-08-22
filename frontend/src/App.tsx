import { useMemo, useState } from 'react'
import {
  Bell, Bookmark, Bot, ChevronDown, Compass, Heart, Home, MessageCircle,
  MoreHorizontal, PenLine, Search, Send, Sparkles, UserRound, Users, Zap,
} from 'lucide-react'

type Post = {
  id: number
  name: string
  handle: string
  initials: string
  time: string
  tone: string
  body: string
  tags: string[]
  likes: number
  comments: number
  liked: boolean
}

const initialPosts: Post[] = [
  { id: 1, name: 'Maya Chen', handle: '@mayac', initials: 'MC', time: '12 min', tone: 'coral', body: 'The best products make the complex feel inevitable. Spent the morning turning a messy research wall into one clear decision.', tags: ['product', 'design'], likes: 84, comments: 12, liked: false },
  { id: 2, name: 'Jon Bell', handle: '@jonbell', initials: 'JB', time: '48 min', tone: 'blue', body: 'A small reminder for builders: ship the version that teaches you something. Elegance is usually hiding on the other side of real feedback.', tags: ['building', 'mindset'], likes: 129, comments: 24, liked: true },
  { id: 3, name: 'Ari Okafor', handle: '@ari.codes', initials: 'AO', time: '2 hr', tone: 'gold', body: 'Today I learned that good activity data is less about collecting everything and more about knowing which moments actually matter.', tags: ['engineering', 'ai'], likes: 61, comments: 8, liked: false },
]

const suggestions = [
  { name: 'Lena Ortiz', handle: '@lenaortiz', initials: 'LO', tone: 'plum' },
  { name: 'Theo Martin', handle: '@theom', initials: 'TM', tone: 'mint' },
  { name: 'Nia Walker', handle: '@niawalks', initials: 'NW', tone: 'orange' },
]

export function App() {
  const [posts, setPosts] = useState(initialPosts)
  const [draft, setDraft] = useState('')
  const [activeNav, setActiveNav] = useState('For you')
  const [following, setFollowing] = useState<string[]>([])
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: 'Your week is taking shape. Ask me about your activity, the community, or what is trending.' }])

  const totalLikes = useMemo(() => posts.reduce((sum, post) => sum + post.likes, 0), [posts])

  function toggleLike(id: number) {
    setPosts(current => current.map(post => post.id === id ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post))
  }

  function publish() {
    if (!draft.trim()) return
    setPosts(current => [{ id: Date.now(), name: 'Sam Rivera', handle: '@samrivera', initials: 'SR', time: 'now', tone: 'mint', body: draft.trim(), tags: ['new'], likes: 0, comments: 0, liked: false }, ...current])
    setDraft('')
  }

  function askAssistant() {
    const question = chatInput.trim()
    if (!question) return
    setChatMessages(current => [...current, { role: 'user', text: question }, { role: 'assistant', text: 'I can trace that through your permitted TRIBA activity. The live Gemini tools will turn this into a contextual answer once Firebase is connected.' }])
    setChatInput('')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">T</span><span>TRIBA</span><small>/ social intelligence</small></div>
        <div className="top-actions"><button className="icon-button" aria-label="Search"><Search size={18} /></button><button className="profile-chip"><span className="avatar avatar-small tone-mint">SR</span><span>Sam Rivera</span><ChevronDown size={15} /></button></div>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <div className="eyebrow">Workspace</div>
          <nav>
            {[[Home, 'For you'], [Compass, 'Explore'], [Bell, 'Notifications'], [Bookmark, 'Saved']].map(([Icon, label]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label as string)}><Icon size={18} /><span>{label as string}</span>{label === 'Notifications' && <b>3</b>}</button>)}
          </nav>
          <div className="sidebar-divider" />
          <div className="eyebrow">Your circles</div>
          <button className="nav-item"><Users size={18} /><span>Following</span></button>
          <button className="nav-item"><Sparkles size={18} /><span>AI insights</span></button>
          <div className="sidebar-foot"><div className="signal"><span /><span /><span /><span /><span /><span /><span /></div><strong>82%</strong><small>your activity pulse</small></div>
        </aside>

        <main className="main-content">
          <section className="page-intro"><div><p className="kicker">THURSDAY, OCTOBER 24</p><h1>A little signal<br /><em>for your day.</em></h1></div><button className="compose-shortcut" onClick={() => document.getElementById('composer')?.focus()}><PenLine size={16} /> Share an idea</button></section>
          <div className="content-grid">
            <div className="feed-column">
              <section className="composer"><div className="avatar tone-mint">SR</div><div className="composer-body"><textarea id="composer" value={draft} onChange={event => setDraft(event.target.value)} placeholder="What are you thinking about?" rows={2} /><div className="composer-tools"><span className="composer-hint">Public to your circle</span><button className="publish-button" disabled={!draft.trim()} onClick={publish}>Publish <Send size={14} /></button></div></div></section>
              <div className="feed-heading"><h2>{activeNav}</h2><button>Latest <ChevronDown size={14} /></button></div>
              {posts.map(post => <article className="post" key={post.id}><div className={`avatar tone-${post.tone}`}>{post.initials}</div><div className="post-content"><div className="post-meta"><div><strong>{post.name}</strong> <span>{post.handle} · {post.time}</span></div><button className="more-button" aria-label="More options"><MoreHorizontal size={18} /></button></div><p>{post.body}</p><div className="tags">{post.tags.map(tag => <span key={tag}>#{tag}</span>)}</div><div className="post-actions"><button className={post.liked ? 'liked' : ''} onClick={() => toggleLike(post.id)}><Heart size={17} fill={post.liked ? 'currentColor' : 'none'} /> {post.likes}</button><button><MessageCircle size={17} /> {post.comments}</button><button><Bookmark size={17} /></button></div></div></article>)}
            </div>
            <aside className="right-rail"><section className="insight-card"><div className="card-label"><Zap size={15} /> Pulse report <span>· today</span></div><h3>You are in a<br /><em>giving mood.</em></h3><p>You have shared 3 ideas and encouraged 8 people this week.</p><div className="metric-row"><div><strong>{totalLikes}</strong><span>community likes</span></div><div><strong>+24%</strong><span>vs last week</span></div></div><button className="text-button" onClick={() => setChatOpen(true)}>Open full report <span>→</span></button></section><section className="people-card"><div className="section-title"><h3>People to know</h3><button>See all</button></div>{suggestions.map(person => <div className="person" key={person.handle}><div className={`avatar avatar-small tone-${person.tone}`}>{person.initials}</div><div><strong>{person.name}</strong><span>{person.handle}</span></div><button className={following.includes(person.handle) ? 'following' : ''} onClick={() => setFollowing(current => current.includes(person.handle) ? current.filter(item => item !== person.handle) : [...current, person.handle])}>{following.includes(person.handle) ? 'Following' : 'Follow'}</button></div>)}</section><div className="quote">“The future belongs to people who notice what everyone else overlooks.”<small>TRIBA community note</small></div></aside>
          </div>
        </main>
      </div>
      <button className="assistant-fab" onClick={() => setChatOpen(true)}><Bot size={19} /><span>Ask TRIBA</span></button>
      {chatOpen && <div className="chat-panel"><div className="chat-header"><div><span className="status-dot" /> TRIBA assistant</div><button onClick={() => setChatOpen(false)}>×</button></div><div className="chat-body">{chatMessages.map((message, index) => <div className={`chat-message ${message.role}`} key={index}>{message.role === 'assistant' && <Bot size={15} />}{message.text}</div>)}</div><div className="chat-input"><input value={chatInput} onChange={event => setChatInput(event.target.value)} onKeyDown={event => event.key === 'Enter' && askAssistant()} placeholder="Ask about your activity..." /><button onClick={askAssistant} aria-label="Send message"><Send size={16} /></button></div></div>}
    </div>
  )
}
