import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'

const getLogs = async () => {
  const logsDirectory = path.join(process.cwd(), 'logs')
  const filenames = await fs.readdir(logsDirectory)

  const logs = await Promise.all(
    filenames.map(async filename => {
      const filePath = path.join(logsDirectory, filename)
      const fileContents = await fs.readFile(filePath, 'utf8')
      const document = matter(fileContents)

      return {
        author: document.data.author,
        color: document.data.color,
        date: document.data.date,
        excerpt: document.data.excerpt,
        id: document.data.id,
        markdown: document.content,
        title: document.data.title,
      }
    })
  )

  return logs.sort((log1, log2) => (log1.date > log2.date ? '-1' : '1'))
}

export default getLogs
