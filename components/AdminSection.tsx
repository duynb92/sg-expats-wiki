'use client'

import { useRef, useState } from 'react'
import {
  addLink,
  deleteLink,
  deleteSection,
  editLink,
  renameSection,
  reorderSection,
} from '@/app/admin/actions'
import type { BookmarkSection } from '@/lib/data'

export default function AdminSection({
  section,
  isFirst,
  isLast,
}: {
  section: BookmarkSection
  isFirst: boolean
  isLast: boolean
}) {
  const { id, section: name, items } = section
  const [editingName, setEditingName] = useState(false)
  const [editingLink, setEditingLink] = useState<number | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  async function handleRename() {
    if (!nameRef.current) return
    await renameSection(id, nameRef.current.value)
    setEditingName(false)
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        {editingName ? (
          <>
            <input
              ref={nameRef}
              className="admin-input"
              defaultValue={name}
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') handleRename() }}
            />
            <button className="admin-btn" onClick={handleRename}>Save</button>
            <button className="admin-btn" onClick={() => setEditingName(false)}>Cancel</button>
          </>
        ) : (
          <>
            <span className="admin-section-name">{name}</span>
            <button
              className="admin-btn"
              disabled={isFirst}
              onClick={() => reorderSection(id, 'up')}
            >↑</button>
            <button
              className="admin-btn"
              disabled={isLast}
              onClick={() => reorderSection(id, 'down')}
            >↓</button>
            <button className="admin-btn" onClick={() => setEditingName(true)}>Rename</button>
            <button
              className="admin-btn danger"
              onClick={() => {
                if (confirm(`Delete section "${name}" and all its links?`)) {
                  deleteSection(id)
                }
              }}
            >Delete</button>
          </>
        )}
      </div>

      {items.map((item, idx) => (
        editingLink === idx ? (
          <EditLinkRow
            key={idx}
            sectionId={id}
            idx={idx}
            defaultTitle={item.title}
            defaultUrl={item.url}
            onDone={() => setEditingLink(null)}
          />
        ) : (
          <div key={idx} className="admin-link-row">
            <span className="admin-link-title">{item.title}</span>
            <span className="admin-link-url">{item.url}</span>
            <div className="admin-link-actions">
              <button className="admin-btn" onClick={() => setEditingLink(idx)}>Edit</button>
              <button
                className="admin-btn danger"
                onClick={() => deleteLink(id, idx)}
              >Delete</button>
            </div>
          </div>
        )
      ))}

      <AddLinkRow sectionId={id} />
    </div>
  )
}

function EditLinkRow({
  sectionId,
  idx,
  defaultTitle,
  defaultUrl,
  onDone,
}: {
  sectionId: string
  idx: number
  defaultTitle: string
  defaultUrl: string
  onDone: () => void
}) {
  const titleRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)

  async function handleSave() {
    if (!titleRef.current || !urlRef.current) return
    await editLink(sectionId, idx, titleRef.current.value, urlRef.current.value)
    onDone()
  }

  return (
    <div className="admin-form-row">
      <input ref={titleRef} className="admin-input" defaultValue={defaultTitle} autoFocus
        onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }} />
      <input ref={urlRef} className="admin-input" defaultValue={defaultUrl}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }} />
      <div className="admin-link-actions">
        <button className="admin-btn" onClick={handleSave}>Save</button>
        <button className="admin-btn" onClick={onDone}>Cancel</button>
      </div>
    </div>
  )
}

function AddLinkRow({ sectionId }: { sectionId: string }) {
  const titleRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)

  async function handleAdd() {
    if (!titleRef.current || !urlRef.current) return
    const title = titleRef.current.value.trim()
    const url = urlRef.current.value.trim()
    if (!title || !url) return
    await addLink(sectionId, title, url)
    titleRef.current.value = ''
    urlRef.current.value = ''
    titleRef.current.focus()
  }

  return (
    <div className="admin-form-row" style={{ borderTop: '1px dashed var(--border)' }}>
      <input ref={titleRef} className="admin-input" placeholder="Title"
        onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }} />
      <input ref={urlRef} className="admin-input" placeholder="https://..."
        onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }} />
      <button className="admin-btn" onClick={handleAdd}>Add</button>
    </div>
  )
}
