'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '@/lib/data'

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function addSection(name: string) {
  const data = readData()
  const id = slugify(name) || `section-${Date.now()}`
  data.push({ id, section: name.trim(), items: [] })
  writeData(data)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteSection(id: string) {
  const data = readData().filter((s) => s.id !== id)
  writeData(data)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function renameSection(id: string, name: string) {
  const data = readData()
  const section = data.find((s) => s.id === id)
  if (section) section.section = name.trim()
  writeData(data)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function addLink(sectionId: string, title: string, url: string) {
  const data = readData()
  const section = data.find((s) => s.id === sectionId)
  if (section) section.items.push({ title: title.trim(), url: url.trim() })
  writeData(data)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function editLink(sectionId: string, idx: number, title: string, url: string) {
  const data = readData()
  const section = data.find((s) => s.id === sectionId)
  if (section && section.items[idx]) {
    section.items[idx] = { title: title.trim(), url: url.trim() }
  }
  writeData(data)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteLink(sectionId: string, idx: number) {
  const data = readData()
  const section = data.find((s) => s.id === sectionId)
  if (section) section.items.splice(idx, 1)
  writeData(data)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function reorderSection(id: string, direction: 'up' | 'down') {
  const data = readData()
  const idx = data.findIndex((s) => s.id === id)
  if (idx === -1) return
  const target = direction === 'up' ? idx - 1 : idx + 1
  if (target < 0 || target >= data.length) return
  ;[data[idx], data[target]] = [data[target], data[idx]]
  writeData(data)
  revalidatePath('/')
  revalidatePath('/admin')
}
