import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'

const getLogs = async () => {
  const logsDirectory = path.join(process.cwd(), 'logs')
  const filenames = await fs.readdir(logsDirectory)

  return await Promise.all(
    filenames.map(async filename => {
      const filePath = path.join(logsDirectory, filename)
      const fileContents = await fs.readFile(filePath, 'utf8')
      const document = matter(fileContents)

      return {
        title: document.data.title,
        author: document.data.author,
        date: document.data.date,
        color: document.data.color,
        markdown: document.content,
      }
    })
  )
}

export default getLogs
