import { readData } from '@/lib/data'
import ThemeToggle from '@/components/ThemeToggle'
import ActiveNav from '@/components/ActiveNav'
import FaviconImg from '@/components/FaviconImg'

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
  } catch {
    return ''
  }
}

export default function Home() {
  const data = readData()
  const totalLinks = data.reduce((sum, s) => sum + s.items.length, 0)

  return (
    <>
      <header className="page-header">
        <span className="page-title">Bookmarks</span>
        <div className="header-right">
          <span className="page-count">{totalLinks} links</span>
          <ThemeToggle />
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar" aria-label="Sections">
          <div className="sidebar-label">Sections</div>
          <nav>
            <ul className="sidebar-nav">
              {data.map(({ id, section }) => (
                <li key={id}>
                  <a href={`#${id}`}>{section}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="content">
          {data.map(({ id, section, items }) => (
            <section key={id} className="section" id={id}>
              <h2 className="section-header">
                <span>{section}</span>
                <span className="section-count">{items.length}</span>
              </h2>
              <div className="item-grid">
                {items.map(({ title, url }) => (
                  <a
                    key={url}
                    className="item"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaviconImg src={getFaviconUrl(url)} />
                    <span className="item-title">{title}</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      <ActiveNav />
    </>
  )
}
