import * as path from 'node:path'
import * as fs from 'node:fs'

const PACKAGES_DIR = path.resolve(__dirname, '..', 'src/packages')

const PROJECTS = fs.readdirSync(PACKAGES_DIR).filter((file) => {
  const stat = fs.statSync(path.resolve(PACKAGES_DIR, file))

  return stat.isDirectory()
})

export default {
  packagesDir: PACKAGES_DIR,
  projects: PROJECTS,
}
