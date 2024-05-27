import { build } from 'astro'
import { getPathToProject } from './helpers/get-path-to-project.ts'
import { mkdir } from 'node:fs/promises'
import { rimraf } from 'rimraf'
import * as fs from 'node:fs'
import * as path from 'node:path'
import chalk from 'chalk'
import paths from './paths.ts'
/** @type {import('astro').AstroUserConfig} */
import playformCompress from '@playform/compress'
import yargs from 'yargs'

const argv = yargs(Bun.argv)
  .version(false)
  .option('projects', { description: 'Build only project with names', alias: 'o', type: 'string', array: true })
  .help()
  .alias('help', 'h')
  .parse()

const packages = paths.projects
const rootPath = path.resolve(__dirname, '..')
const distFolder = `${rootPath}/dist`

export default (async function runner() {
  console.log(chalk.bgWhite.black(' => Generate build script'))

  if (fs.existsSync(distFolder)) {
    await rimraf.rimraf(distFolder)
  }

  await mkdir(distFolder)

  const { projects } = await argv

  const projectsForBuild = projects ? projects : packages

  for (const project of projectsForBuild) {
    const pathToProject = getPathToProject(project)

    if (fs.existsSync(pathToProject)) {
      await build({
        srcDir: pathToProject,
        root: path.resolve(__dirname, '..'),
        outDir: `${distFolder}/${project}`,
        site: `https://${project}`,
        integrations: [playformCompress()],
      })
    }
  }
})()
