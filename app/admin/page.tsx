import Link from 'next/link'
import { readData } from '@/lib/data'
import AdminSection from '@/components/AdminSection'
import AddSectionForm from '@/components/AddSectionForm'

export default function AdminPage() {
  const data = readData()

  return (
    <>
      <header className="admin-header">
        <span className="page-title">Admin — Bookmarks</span>
        <Link href="/">← View Site</Link>
      </header>

      <div className="admin-content">
        {data.map((section, idx) => (
          <AdminSection
            key={section.id}
            section={section}
            isFirst={idx === 0}
            isLast={idx === data.length - 1}
          />
        ))}

        <AddSectionForm />
      </div>
    </>
  )
}
