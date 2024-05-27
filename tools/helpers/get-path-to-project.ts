import path from 'node:path'

export const getPathToProject = (project: string): string =>
  path.resolve(__dirname, '..', '..', 'src', 'packages', project)