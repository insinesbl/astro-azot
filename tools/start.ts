import { dev } from 'astro'
import paths from './paths.ts'
import inquirer, { type Answers } from 'inquirer'
import chalk from 'chalk'
import * as path from 'node:path'
import { getPathToProject } from './helpers/get-path-to-project.ts'

Bun.env.NODE_ENV = 'development'

const argv = Bun.argv.slice(2)

const packages = paths.projects
let project = argv[0]

export default (async function runner() {
  if (project === undefined || !packages.includes(project)) {
    const answers = await inquirer.prompt<Answers>([
      {
        type: 'list',
        name: 'project',
        message: 'Which project from `packages` do you want to start in dev mode?',
        choices: packages,
      },
    ])

    project = answers.project
  }

  console.log(chalk.blue(' => Generate build script'))
  console.log(chalk.blue(' => Start watch process for ') + chalk.green(`${project}`) + chalk.blue(' package'))

  const pathToProject = getPathToProject(project)

  return await dev({
    srcDir: pathToProject,
    server: {
      open: true,
    },
    root: path.resolve(__dirname, '..'),
  })
})()
