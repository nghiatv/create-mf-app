#!/usr/bin/env node
import inquirer from 'inquirer'
import shell from 'shelljs'
import fs from 'fs'
import path from 'path'
import { buildProject } from '../src/index'
import { Project } from '../src/types'
;(async function () {
  const answers = await inquirer.prompt<Project>([
    {
      type: 'input',
      message: 'Pick the name of your app:',
      name: 'name',
      default: 'module'
    },
    {
      type: 'list',
      message: 'Project Type:',
      name: 'type',
      choices: ['Application'],
      default: 'Application'
    }
  ])

  if (answers.type === 'Application') {
    const templates = fs
      .readdirSync(path.join(__dirname, '../templates/application'))
      .sort()

    const appAnswers = await inquirer.prompt<Project>([
      {
        type: 'input',
        message: 'Port number:',
        name: 'port',
        default: '3030'
      },
      {
        type: 'list',
        message: 'Framework:',
        name: 'framework',
        choices: templates,
        default: 'react'
      },
      {
        type: 'list',
        message: 'Language:',
        name: 'language',
        choices: ['typescript'],
        default: 'typescript'
      },
      {
        type: 'list',
        message: 'CSS:',
        name: 'css',
        choices: ['CSS', 'Tailwind'],
        default: 'Tailwind'
      },
      {
        type: 'input',
        message: "Tailwind Prefix:  (ignore if you don't use Tailwind)",
        name: 'prefix',
        default: ''
      }
    ])

    buildProject({
      ...answers,
      ...appAnswers
    })
  }

  shell.echo(`Your '${answers.name}' project is ready to go.

Next steps:

▶️ cd ${answers.name}
▶️ yarn
▶️ yarn start
`)
})()
