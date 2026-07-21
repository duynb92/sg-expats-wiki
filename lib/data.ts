import fs from 'fs'
import path from 'path'

export type BookmarkItem = { title: string; url: string }
export type BookmarkSection = { id: string; section: string; items: BookmarkItem[] }

const DATA_PATH = path.join(process.cwd(), 'lib', 'data.json')

export function readData(): BookmarkSection[] {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
}

export function writeData(data: BookmarkSection[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}
