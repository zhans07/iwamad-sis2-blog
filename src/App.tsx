
import { useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useParams } from 'react-router'
import './App.css'

type Post = {
  id: number
  title: string
  category: string
  date: string
  excerpt: string
  content: string
  likes: number
}

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Building Better Habits',
    category: 'Lifestyle',
    date: 'October 12, 2026',
    excerpt: 'Small daily actions can create meaningful long-term change.',
    content: 'Good habits do not appear overnight. Start with one small action, repeat it consistently, and celebrate your progress. Over time, small improvements can make a big difference.',
    likes: 0,
  },
  {
    id: 2,
    title: 'My Journey into Web Development',
    category: 'Technology',
    date: 'October 14, 2026',
    excerpt: 'What I learned while starting to build websites.',
    content: 'Learning web development takes patience and practice. HTML provides structure, CSS creates the visual design, and JavaScript makes pages interactive. React helps organize an application into reusable components.',
    likes: 0,
  },
  {
    id: 3,
    title: 'The Art of Staying Organized',
    category: 'Productivity',
    date: 'October 16, 2026',
    excerpt: 'Simple ways to manage tasks and protect your time.',
    content: 'Writing down your priorities makes it easier to focus. Break large tasks into smaller steps, plan realistic deadlines, and review your progress at the end of each day.',
    likes: 0,
  },
  {
    id: 4,
    title: 'Why Reading Still Matters',
    category: 'Books',
    date: 'October 18, 2026',
    excerpt: 'Reading helps us discover new ideas and perspectives.',
    content: 'Books introduce us to different experiences and ways of thinking. Even reading for fifteen minutes each day can help build knowledge, improve concentration, and develop vocabulary.',
    likes: 0,
  },
  {
    id: 5,
    title: 'Finding Inspiration in Everyday Life',
    category: 'Lifestyle',
    date: 'October 20, 2026',
    excerpt: 'Creative ideas can begin with ordinary moments.',
    content: 'Inspiration can come from a conversation, a walk, music, or a new experience. Pay attention to the world around you and keep a note of ideas that make you curious.',
    likes: 0,
  },
]

function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">The Little Journal<span>.</span></Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/signin">Sign in</NavLink>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>Made with curiosity and a little coffee.</p>
      <p>© 2026 The Little Journal</p>
    </footer>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">{children}</main>
      <Footer />
    </div>
  )
}

function PostCard({
  post,
  onLike,
}: {
  post: Post
  onLike: (id: number) => void
}) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span className="category">{post.category}</span>
        <span>{post.date}</span>
      </div>
      <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
      <p>{post.excerpt}</p>
      <div className="post-card-bottom">
        <Link className="read-link" to={`/posts/${post.id}`}>Read article →</Link>
        <button className="like-button" onClick={() => onLike(post.id)} aria-label={`Like ${post.title}`}>
          ♥ {post.likes}
        </button>
      </div>
    </article>
  )
}

function HomePage({ posts, onLike }: { posts: Post[]; onLike: (id: number) => void }) {
  return (
    <>
      <section className="hero-section">
        <p className="eyebrow">NOTES, STORIES & IDEAS</p>
        <h1>A little space for <em>big thoughts.</em></h1>
        <p className="hero-copy">Personal stories, useful discoveries, and small things worth remembering.</p>
        <Link className="primary-button" to="/posts">Explore the journal</Link>
      </section>
      <section className="posts-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE LATEST</p>
            <h2>Fresh from the journal</h2>
          </div>
          <Link to="/posts" className="read-link">All posts →</Link>
        </div>
        <div className="post-grid">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} onLike={onLike} />
          ))}
        </div>
      </section>
    </>
  )
}

function PostsPage({ posts, onLike }: { posts: Post[]; onLike: (id: number) => void }) {
  return (
    <section className="posts-section">
      <p className="eyebrow">THE ARCHIVE</p>
      <h1>All stories</h1>
      <p className="page-intro">A collection of thoughts, lessons, and things I find interesting.</p>
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={onLike} />
        ))}
      </div>
    </section>
  )
}

function PostDetailPage({ posts, onLike }: { posts: Post[]; onLike: (id: number) => void }) {
  const { id } = useParams()
  const post = posts.find((item) => item.id === Number(id))

  if (!post) {
    return <NotFoundPage message="We couldn't find that article." />
  }

  return (
    <article className="article-page">
      <Link className="read-link" to="/posts">← Back to all posts</Link>
      <p className="eyebrow">{post.category} · {post.date}</p>
      <h1>{post.title}</h1>
      <p className="article-lead">{post.excerpt}</p>
      <div className="article-body"><p>{post.content}</p></div>
      <button className="primary-button" onClick={() => onLike(post.id)}>
        ♥ Like this article · {post.likes}
      </button>
    </article>
  )
}

function ContactPage() {
  return (
    <section className="simple-page">
      <p className="eyebrow">SAY HELLO</p>
      <h1>Let’s connect.</h1>
      <p className="page-intro">Have a thought, a question, or a story to share?</p>
      <a className="primary-button" href="mailto:hello@example.com">Email the journal</a>
    </section>
  )
}

function SignInPage({ onSignIn }: { onSignIn: () => void }) {
  return (
    <section className="simple-page">
      <p className="eyebrow">READER ACCOUNT</p>
      <h1>Welcome back.</h1>
      <p className="page-intro">This demo sign-in uses local React state. No password or server is required.</p>
      <button className="primary-button" onClick={onSignIn}>Sign in to continue</button>
    </section>
  )
}

function DashboardPage({ onSignOut }: { onSignOut: () => void }) {
  return (
    <section className="simple-page">
      <p className="eyebrow">PROTECTED PAGE</p>
      <h1>Your reader dashboard.</h1>
      <p className="page-intro">You are signed in. This page is available only while the local sign-in state is active.</p>
      <button className="primary-button" onClick={onSignOut}>Sign out</button>
    </section>
  )
}

function NotFoundPage({ message = 'The page you are looking for does not exist.' }: { message?: string }) {
  return (
    <section className="simple-page">
      <p className="eyebrow">ERROR 404</p>
      <h1>Lost in the pages?</h1>
      <p className="page-intro">{message}</p>
      <Link className="primary-button" to="/">Back home</Link>
    </section>
  )
}

function ProtectedRoute({
  signedIn,
  children,
}: {
  signedIn: boolean
  children: React.ReactNode
}) {
  if (!signedIn) {
    return <Navigate to="/signin" replace />
  }

  return children
}

function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [signedIn, setSignedIn] = useState(false)

  function handleLike(id: number) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post,
      ),
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage posts={posts} onLike={handleLike} />} />
        <Route path="/posts" element={<PostsPage posts={posts} onLike={handleLike} />} />
        <Route path="/posts/:id" element={<PostDetailPage posts={posts} onLike={handleLike} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInPage onSignIn={() => setSignedIn(true)} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute signedIn={signedIn}>
              <DashboardPage onSignOut={() => setSignedIn(false)} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
