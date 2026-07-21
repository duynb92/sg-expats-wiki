'use client'

import { useRef } from 'react'
import { addSection } from '@/app/admin/actions'

export default function AddSectionForm() {
  const nameRef = useRef<HTMLInputElement>(null)

  async function handleAdd() {
    if (!nameRef.current) return
    const name = nameRef.current.value.trim()
    if (!name) return
    await addSection(name)
    nameRef.current.value = ''
  }

  return (
    <div className="admin-add-section">
      <h3>Add Section</h3>
      <div className="admin-add-section-form">
        <input
          ref={nameRef}
          className="admin-input"
          placeholder="Section name"
          onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }}
        />
        <button className="admin-btn" onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}
